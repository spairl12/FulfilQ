"""Generates the fictionalised inbound order-fulfilment documents for Corvina Quarter Stage 2:
  1. <PO>_Order_Schedule.xlsx - a call-up style order schedule (blanket PO, a sub-PO per delivery, delivery dates by
     product group, grouped by phase), modelled on the layout of a real commercial call-up sheet.
  2. <PO>_email.eml          - the customer's PO email that carries it.
All parties, addresses, numbers and contacts are fictional. Items are evolved from the tender schedule
(Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx); "ALT" marks an approved alternative, derived only from the
catalogue's Discontinued -> SupersededBy links (never from the Build Plan 2 answer key)."""
import csv, datetime as dt, os
import openpyxl
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.normpath(os.path.join(HERE, "..", "..", "meridian-data-v2"))
PO, BSO, PROJECT_ID = "HBC-PO-77120", "BSO-2026-0141", "PID-CQ-S2"
OUT_XLSX = os.path.join(DATA, f"Corvina_Quarter_{PO}_Order_Schedule.xlsx")
OUT_EML = os.path.join(DATA, f"Corvina_Quarter_{PO}_email.eml")
TODAY = dt.date(2026, 9, 19)
ROUGH_IN = ("Toilet Suite", "Basin Mixer", "Shower Set")  # BP4 rule: these families ship at plumbing rough-in

products = {r["ModelCode"]: r for r in csv.DictReader(open(os.path.join(DATA, "04_products.csv"), encoding="utf-8-sig"))}
by_code = {r["ProductCode"]: r for r in products.values()}
families = {r["Name"]: r["Category"] for r in csv.DictReader(open(os.path.join(DATA, "02_product_families.csv"), encoding="utf-8-sig"))}

# ---- read tender schedule items ----
ws = openpyxl.load_workbook(os.path.join(DATA, "Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx"), data_only=True).active
header_row = next(r for r in range(1, 20) if ws.cell(r, 1).value == "Item")
items = []
for r in range(header_row + 1, ws.max_row + 1):
    v = [ws.cell(r, c).value for c in range(1, 14)]
    if not v[0] or not v[8]:
        continue
    model = str(v[5] or "").strip()
    prod = products.get(model)
    alt = bool(prod and prod["LifecycleStatus"] == "Discontinued" and prod["SupersededByCode"])
    if alt:
        prod = by_code[prod["SupersededByCode"]]
        model = prod["ModelCode"]
    family = prod["ProductFamily"] if prod else ""
    group = "Appliances" if (families.get(family) == "Appliances" or (not prod and v[1] in ("Kitchen", "Laundry", "Butlers Pantry"))) else "Tapware & Sanitaryware"
    items.append(dict(item=f"{v[0]}{' ALT' if alt else ''}", model=model or "(unconfirmed)", desc=str(v[3])[:60],
                      tier=str(v[2]), qty=int(v[8]), group=group, rough_in=family in ROUGH_IN))

# ---- delivery plan: one sub-PO per delivery column ----
def weekly(start, n, step=7): return [start + dt.timedelta(days=step * i) for i in range(n)]
deliveries = [dict(phase="Prototype", label="Prototype (display suite)", dates={"Appliances": dt.date(2026, 9, 10), "Tapware & Sanitaryware": dt.date(2026, 9, 10)})]
for i, (lbl, d) in enumerate(zip(["Levels 1-6", "Levels 7-12", "Levels 13-18 + PH"], weekly(dt.date(2026, 11, 4), 3, 21))):
    deliveries.append(dict(phase="Phase 1 - Plumbing rough-in", label=lbl, dates={"Tapware & Sanitaryware": d}))
app_dates, ts_dates = weekly(dt.date(2027, 1, 11), 18, 5), weekly(dt.date(2027, 1, 7), 18, 5)
for lvl in range(1, 19):
    deliveries.append(dict(phase="Phase 2 - Fitout, Levels 1-18", label=f"Level {lvl}",
                           dates={"Appliances": app_dates[lvl - 1], "Tapware & Sanitaryware": ts_dates[lvl - 1]}))
deliveries.append(dict(phase="Phase 3 - Penthouse finishes", label="Penthouse (L19)",
                       dates={"Appliances": dt.date(2027, 6, 16), "Tapware & Sanitaryware": dt.date(2027, 6, 11)}))
for n, d in enumerate(deliveries, start=1):
    d["subpo"] = f"{PO}-{n:02d}"

def split(total, parts):
    base, extra = divmod(total, parts)
    return [base + (1 if i < extra else 0) for i in range(parts)]

for it in items:
    q = {d["label"]: 0 for d in deliveries}
    remaining = it["qty"]
    if it["tier"] == "Standard" and not it["rough_in"] and remaining > 18:
        q["Prototype (display suite)"] = 1; remaining -= 1
    if it["rough_in"]:
        for lbl, n in zip(["Levels 1-6", "Levels 7-12", "Levels 13-18 + PH"], split(remaining, 3)): q[lbl] = n
    elif it["tier"] == "Penthouse":
        q["Penthouse (L19)"] = remaining
    else:
        for lvl, n in enumerate(split(remaining, 18), start=1): q[f"Level {lvl}"] = n
    it["plan"] = q
    it["received"] = q["Prototype (display suite)"]
    it["remaining"] = it["qty"] - it["received"]

# ---- workbook ----
wb = openpyxl.Workbook(); sh = wb.active; sh.title = "Order Schedule"
bold, thin = Font(bold=True), Side(style="thin", color="999999")
box = Border(left=thin, right=thin, top=thin, bottom=thin)
FILL = {"Received": "C6EFCE", "Overdue": "FFC7CE", "Scheduled for delivery": "BDD7EE"}
for r, t in enumerate(["Meridian Commercial Supply Pty Ltd", "Unit 4, 88 Dohertys Road", "Truganina VIC 3029",
                       "T: 03 9000 0141", "ABN: 00 000 000 000 (fictional)"], start=1):
    sh.cell(r, 7, t).font = Font(bold=(r == 1), size=12 if r == 1 else 10)
sh.cell(7, 2, "APARTMENT FINISHES - ORDER SCHEDULE / CALL-UP").font = Font(bold=True, size=13)
info = [("Customer", "HALLORAN BRIGHT CONSTRUCTIONS PTY LTD (fictional)"), ("Blanket Sales Ref #", BSO), ("Customer PO No.", PO),
        ("Project ID/Name", f"{PROJECT_ID}  Corvina Quarter Stage 2")]
site = [("Delivery Address:", "12 Harbour Esplanade, Docklands VIC 3008"), ("Site Contact:", "Idris Fanshawe (Project Manager)"),
        ("Phone #:", "0400 000 141"), ("Email:", "idris.fanshawe@halloranbright.example")]
for i, (k, v) in enumerate(info):
    sh.cell(8 + i, 2, k).font = bold; sh.cell(8 + i, 3, v)
for i, (k, v) in enumerate(site):
    sh.cell(8 + i, 5, k).font = bold; sh.cell(8 + i, 6, v)
for i, (k, c) in enumerate(FILL.items()):
    sh.cell(7 + i, 16, "").fill = PatternFill("solid", fgColor=c); sh.cell(7 + i, 17, k)

FIRST = 8  # first delivery column
heads = ["Tender Item #", "Model Code", "Item Description", "Order Qty", "Remaining Qty", f"Received on Site ({TODAY:%d/%m/%y})"]
row = 13
for grp in ("Appliances", "Tapware & Sanitaryware"):
    g_items = [i for i in items if i["group"] == grp]
    if not g_items:
        continue
    sh.cell(row, 2, f"{grp.upper()} - delivery schedule").font = Font(bold=True, size=11); row += 1
    for c, d in enumerate(deliveries, start=FIRST):  # phase / sub-PO / date / label header rows
        sh.cell(row, c, d["phase"]).font = Font(italic=True, size=8)
        sh.cell(row + 1, c, d["subpo"]).font = Font(size=8)
        date = d["dates"].get(grp)
        cell = sh.cell(row + 2, c, date.strftime("%d/%m/%Y") if date else "-")
        status = "Received" if date and date < TODAY else "Scheduled for delivery"
        if date: cell.fill = PatternFill("solid", fgColor=FILL[status])
        sh.cell(row + 3, c, d["label"]).font = bold
    sh.cell(row, FIRST - 1, "Phase").font = bold
    sh.cell(row + 1, FIRST - 1, "Sub-PO #").font = bold
    sh.cell(row + 2, FIRST - 1, "Delivery Date").font = bold
    for c, h in enumerate(heads, start=2):
        sh.cell(row + 3, c, h).font = bold
    row += 4
    for it in g_items:
        vals = [it["item"], it["model"], it["desc"], it["qty"], it["remaining"], it["received"]]
        for c, v in enumerate(vals, start=2):
            sh.cell(row, c, v).border = box
        for c, d in enumerate(deliveries, start=FIRST):
            n = it["plan"][d["label"]]
            cell = sh.cell(row, c, n if n else None); cell.border = box
            cell.alignment = Alignment(horizontal="center")
        row += 1
    row += 2
sh.cell(row, 2, "Quantities are totals per delivery. Each delivery column is a separate sub-PO under the blanket PO above; "
                "items marked ALT are approved alternatives to the tendered model.").font = Font(italic=True, size=9)
sh.column_dimensions["D"].width = 44
for c in "BCEFG": sh.column_dimensions[c].width = 16
wb.save(OUT_XLSX)

# ---- PO email ----
total = sum(i["qty"] for i in items)
eml = f"""From: Dana Whitlock <dana.whitlock@halloranbright.example>
To: Commercial Orders <orders@meridiancommercial.example>
Cc: Idris Fanshawe <idris.fanshawe@halloranbright.example>
Date: Fri, 18 Sep 2026 16:42:00 +1000
Subject: PO {PO} - Corvina Quarter Stage 2 - Appliances, tapware & sanitaryware (Blanket {BSO})
MIME-Version: 1.0
Content-Type: text/plain; charset="utf-8"

Hi Meridian Commercial team,

Following award of tender TND-2026-0141, please find attached our blanket purchase order {PO}
for Corvina Quarter Stage 2 (project {PROJECT_ID}), referencing your blanket sales order {BSO}.

- {len(items)} line items, {total} units in total, across {len(deliveries)} scheduled deliveries.
- Each delivery column in the attached schedule is issued as its own sub-PO ({PO}-01 to {PO}-{len(deliveries):02d}).
- Phase 1 (plumbing rough-in) must land before 23/12/2026; fitout runs level by level from January.
- Items marked ALT are the approved alternatives agreed at tender clarification.
- Deliveries to 12 Harbour Esplanade, Docklands. Site contact: Idris Fanshawe, 0400 000 141.

Please confirm stock and delivery dates against each sub-PO, and flag any line you cannot fill
from your Melbourne DC so we can agree store or interstate supply early.

Attachment: Corvina_Quarter_{PO}_Order_Schedule.xlsx

Kind regards,
Dana Whitlock
Contracts Manager, Halloran Bright Constructions (fictional)
"""
open(OUT_EML, "w").write(eml)
print(f"{len(items)} items ({sum(1 for i in items if 'ALT' in i['item'])} ALT), {len(deliveries)} deliveries/sub-POs, {total} units")
print(OUT_XLSX); print(OUT_EML)
