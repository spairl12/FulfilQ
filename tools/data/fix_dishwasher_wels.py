"""Master-data fix: dishwashers are WELS-regulated in Australia (water efficiency), but the catalogue carried no WELS
registration or rating for any of them, so every dishwasher failed the KS1 2.2 / KS2 7 compliance floor.

Fills SPAIWelsRegistrationNo and WELSRating for every dishwasher in meridian-data-v2/04_products.csv:
- registration numbers follow the catalogue's existing fictional format (Wnnnnn-nn), derived deterministically
  from the product code and unique across the catalogue;
- ratings are realistic dishwasher water ratings (3.5 to 6.0 stars), derived deterministically;
- a replacement is never rated below the product it replaces (Discontinued -> SupersededBy links and the
  substitution register), so WELS cannot become a new reason to reject an existing substitution.
Only blank values are filled, so re-running is a no-op. Load into the instance with `imp.py dishwasher_wels`."""
import csv, hashlib, os

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.normpath(os.path.join(HERE, "..", "..", "meridian-data-v2"))
PRODUCTS = os.path.join(DATA, "04_products.csv")
RATINGS = ["3.5", "4.0", "4.0", "4.5", "4.5", "5.0", "5.0", "5.5", "6.0"]  # weighted to the common 4-5 star band

def h(code, salt): return int(hashlib.sha256(f"{salt}:{code}".encode()).hexdigest(), 16)

with open(PRODUCTS, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f); fields = reader.fieldnames; rows = list(reader)
by_code = {r["ProductCode"]: r for r in rows}
dw = [r for r in rows if r["ProductFamily"] == "Dishwasher"]
used = {r["WelsRegistrationNo"] for r in rows if r["WelsRegistrationNo"]}

filled = 0
for r in dw:
    if not r["WelsRegistrationNo"]:
        n = h(r["ProductCode"], "wels-reg")
        reg = f"W{n % 90000 + 10000}-{n // 90000 % 100:02d}"
        while reg in used:
            n += 1; reg = f"W{n % 90000 + 10000}-{n // 90000 % 100:02d}"
        r["WelsRegistrationNo"] = reg; used.add(reg); filled += 1
    if not r["WELSRating"] or float(r["WELSRating"]) == 0:
        r["WELSRating"] = RATINGS[h(r["ProductCode"], "wels-rating") % len(RATINGS)]

# a replacement is never rated below what it replaces (iterate for chains)
rules = list(csv.DictReader(open(os.path.join(DATA, "06_substitution_rules.csv"), encoding="utf-8-sig")))
pairs = [(r["ProductCode"], r["SupersededByCode"]) for r in dw if r["SupersededByCode"]]
pairs += [(x["FromProductCode"], x["ToProductCode"]) for x in rules
          if by_code[x["FromProductCode"]]["ProductFamily"] == "Dishwasher"]
changed = True
while changed:
    changed = False
    for a, b in pairs:
        if float(by_code[b]["WELSRating"]) < float(by_code[a]["WELSRating"]):
            by_code[b]["WELSRating"] = by_code[a]["WELSRating"]; changed = True

with open(PRODUCTS, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=fields, lineterminator="\r\n"); w.writeheader(); w.writerows(rows)
bad = sum(1 for a, b in pairs if float(by_code[b]["WELSRating"]) < float(by_code[a]["WELSRating"]))
print(f"dishwashers {len(dw)}, registrations filled {filled}, replacement pairs {len(pairs)}, pairs rated below source {bad}")
print("rating mix", sorted({r["WELSRating"]: sum(1 for x in dw if x["WELSRating"] == r["WELSRating"]) for r in dw}.items()))
