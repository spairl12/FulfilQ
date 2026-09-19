#!/usr/bin/env python3
"""Test Gate 2: Adjudicator answer-key scoring (02 §3 table, 02 §7 metrics that can be computed offline).

Scores one or more saved Adjudicator outputs (one file per run, raw model reply) against
09_hero_schedule_ANSWER_KEY.csv. Every row is PASS or FAIL. The gate passes only if every row passes on
every run AND there are at least five runs (02 §3: "Iterate until it holds across five runs").

    python3 ai-studio/tests/score_adjudication.py run1.json run2.json run3.json run4.json run5.json

The floor re-check applies Governance Block 2 with the KS2 §7 Combined eligibility matrix, the
workbook's cut-outs, and the specified product's ratings (products CSV, matched by model code). The same
logic runs in BP3_ApplyVerdicts.cs. If product data is fixed in the instance (for example dishwasher WELS
registrations), export Product to CSV with the 04_products.csv headers and pass --products.
Defaults: meridian-data-v2 (the dataset loaded into the instance, including the 2026-09-20 dishwasher WELS
fix) and the answer key read from meridian-seed-data-v2.zip.
"""
import argparse
import csv
import io
import json
import re
import sys
import zipfile
from collections import defaultdict
from pathlib import Path

import openpyxl

REPO = Path(__file__).resolve().parents[2]
DATA = REPO / "meridian-data-v2"  # the dataset loaded into the instance
ANSWER_KEY = REPO / "meridian-seed-data-v2.zip"  # holds the v2 answer key; deliberately not committed
LEAD_LIMIT = 12
# KS2 §7 Combined eligibility matrix: cut-out, WELS, GEMS, WaterMark. Keep identical to BP3_BuildCandidateSet.cs.
REGIMES = {
    "Wall Oven": (1, 0, 1, 0), "Cooktop": (1, 0, 1, 0), "Dishwasher": (1, 1, 1, 0),
    "Rangehood": (1, 0, 0, 0), "Microwave": (1, 0, 0, 0), "Basin": (0, 0, 0, 1), "Toilet Suite": (0, 1, 0, 1),
    "Basin Mixer": (0, 1, 0, 1), "Shower Set": (0, 1, 0, 1), "Kitchen Sink Mixer": (0, 1, 0, 1),
}
EXPECTED = {  # 02 §3 table: planted -> (lines, expected code)
    "EXACT": (24, None), "STORE_FALLBACK": (3, None), "DISCONTINUED": (6, "DISCONTINUED_SUB"),
    "LONG_LEAD": (4, "LEADTIME_SUB"), "AMBIGUOUS": (3, "AMBIGUOUS_SPEC"), "DIM_TRAP": (2, "DIM_MISMATCH"),
    "TYPO": (1, "CODE_UNRECOGNISED"), "NO_EQUIVALENT": (1, "NO_EQUIVALENT"),
}


def read_answer_key(path):
    """Answer key from a CSV, or straight from the seed zip (never extracted, never committed)."""
    if path.endswith(".zip"):
        with zipfile.ZipFile(path) as z:
            member = next(n for n in z.namelist() if n.endswith("09_hero_schedule_ANSWER_KEY.csv"))
            text = z.read(member).decode("utf-8-sig")
        return list(csv.DictReader(io.StringIO(text)))
    return list(csv.DictReader(open(path, newline="", encoding="utf-8-sig")))


def fnum(v):
    return float(v) if v not in (None, "") else None


def load(args):
    products = {r["ProductCode"]: r for r in csv.DictReader(open(args.products, newline="", encoding="utf-8-sig"))}
    by_model = {r["ModelCode"]: r for r in products.values()}
    stock = defaultdict(int)
    for s in csv.DictReader(open(args.stock, newline="", encoding="utf-8-sig")):
        stock[s["ProductCode"]] += int(s["QtyAvailable"] or 0)
    key = {int(r["Item"]): r for r in read_answer_key(args.answer_key)}
    for r in key.values():  # the v2 key has no ProductFamily column: take it from the source product
        r.setdefault("ProductFamily", products[r["_sourceProduct"]]["ProductFamily"])
    rows = list(openpyxl.load_workbook(args.workbook, data_only=True).active.iter_rows(values_only=True))
    h = next(i for i, r in enumerate(rows) if r and r[0] == "Item")
    wb = {int(r[0]): dict(zip(rows[h], r)) for r in rows[h + 1:] if r and r[0] and str(r[0]).isdigit()}
    return products, by_model, stock, key, wb


def floor_failures(product, line, key_row, by_model):
    """Block 2 floor for one (line, product) pair. Returns the list of failed conditions."""
    fam = key_row["ProductFamily"]
    cut, wels, gems, wm = REGIMES.get(fam, (1, 1, 1, 1))
    spec = by_model.get(line.get("Model Code") or "")
    fails = []
    if product["LifecycleStatus"] != "Current":
        fails.append("lifecycle Current")
    if product["ProjectApproved"] != "Yes":
        fails.append("project approved")
    if cut and (product["CutoutWidthMm"], product["CutoutHeightMm"], product["CutoutDepthMm"]) != (
            str(line.get("Cut-out W") or ""), str(line.get("Cut-out H") or ""), str(line.get("Cut-out D") or "")):
        fails.append("cut-out")
    if wels and (not product["WelsRegistrationNo"] or
                 (spec and fnum(spec["WELSRating"]) is not None and (fnum(product["WELSRating"]) or 0) < fnum(spec["WELSRating"]))):
        fails.append("WELS")
    if gems and (not product["GemsRegistrationNo"] or
                 (spec and fnum(spec["EnergyStarRating"]) is not None and (fnum(product["EnergyStarRating"]) or 0) < fnum(spec["EnergyStarRating"]))):
        fails.append("GEMS")
    if wm and not product["WaterMarkCertNo"]:
        fails.append("WaterMark")
    return fails


def strict_parse(text):
    s = text.strip()
    if not s.startswith("{") or not s.endswith("}"):
        return None, "reply is not a bare JSON object (fences or prose present)"
    try:
        doc = json.loads(s)
    except json.JSONDecodeError as e:
        return None, f"JSON decode error: {e}"
    if not isinstance(doc.get("verdicts"), list):
        return None, "verdicts array missing"
    return doc, ""


def score_run(doc, products, by_model, stock, key, wb):
    v = {int(x["lineNumber"]): x for x in doc["verdicts"] if isinstance(x, dict) and "lineNumber" in x}
    code = lambda n: (v.get(n) or {}).get("reasonCode")
    sel = lambda n: ((v.get(n) or {}).get("selectedProductCode") or "").strip()
    lines_of = lambda planted: sorted(n for n, r in key.items() if r["_planted"] == planted)
    out = []

    for planted in ("EXACT", "STORE_FALLBACK"):
        ns = lines_of(planted)
        leaked = [n for n in ns if n in v]
        out.append((f"{planted} ({len(ns)}) resolved upstream: should never reach the Adjudicator",
                    not leaked and len(ns) == EXPECTED[planted][0], f"leaked lines: {leaked or 'none'}"))

    ns = lines_of("DISCONTINUED")
    detail, ok = [], len(ns) == 6
    for n in ns:
        src = products[key[n]["_sourceProduct"]]
        target = src["SupersededByCode"]
        target_ok = (target in products and not floor_failures(products[target], wb[n], key[n], by_model)
                     and stock[target] >= int(key[n]["TotalQty"]))
        good = code(n) == "DISCONTINUED_SUB" and (sel(n) == target if target_ok else bool(sel(n)))
        ok = ok and good
        detail.append(f"{n:03d} {code(n)} {sel(n) or '-'} (superseded-by {target or '-'}{'' if target_ok else ', not compliant+stocked'}) {'ok' if good else 'WRONG'}")
    out.append(("DISCONTINUED (6) -> DISCONTINUED_SUB: select the superseded-by target where compliant and stocked", ok, "; ".join(detail)))

    ns = lines_of("LONG_LEAD")
    detail, ok = [], len(ns) == 4
    for n in ns:
        lead = int(products[key[n]["_sourceProduct"]]["LeadTimeWeeks"] or 0)
        good = code(n) == "LEADTIME_SUB" and lead > LEAD_LIMIT
        ok = ok and good
        detail.append(f"{n:03d} {code(n)} lead {lead}w {'ok' if good else 'WRONG'}")
    wrongly = [n for n in v if code(n) == "LEADTIME_SUB" and not (
        by_model.get(wb.get(n, {}).get("Model Code") or "") and
        int(by_model[wb[n]["Model Code"]]["LeadTimeWeeks"] or 0) > LEAD_LIMIT)]
    ok = ok and not wrongly
    detail.append(f"LEADTIME_SUB on lines with lead <= {LEAD_LIMIT}w: {wrongly or 'none'}")
    out.append(("LONG_LEAD (4) -> LEADTIME_SUB: only where lead time exceeds 12 weeks", ok, "; ".join(detail)))

    ns = lines_of("AMBIGUOUS")
    detail, ok = [], len(ns) == 3
    for n in ns:
        good = code(n) == "AMBIGUOUS_SPEC" and (v.get(n) or {}).get("requiresHuman") is True and not sel(n)
        ok = ok and good
        detail.append(f"{n:03d} {code(n)} human={(v.get(n) or {}).get('requiresHuman')} product={sel(n) or '-'} {'ok' if good else 'WRONG'}")
    out.append(("AMBIGUOUS (3) -> AMBIGUOUS_SPEC: requiresHuman true, must not guess a brand", ok, "; ".join(detail)))

    ns = lines_of("DIM_TRAP")
    good_all = len(ns) == 2 and all(code(n) == "DIM_MISMATCH" and not sel(n) for n in ns)
    out.append(("DIM_TRAP (2) -> DIM_MISMATCH: MUST NOT substitute", good_all,
                "; ".join(f"{n:03d} {code(n)} product={sel(n) or '-'}" for n in ns)))

    ns = lines_of("TYPO")
    detail, ok = [], len(ns) == 1
    for n in ns:
        conf = (v.get(n) or {}).get("confidence")
        intended = key[n]["_sourceProduct"]
        good = code(n) == "CODE_UNRECOGNISED" and sel(n) == intended and isinstance(conf, (int, float)) and conf < 0.9
        ok = ok and good
        detail.append(f"{n:03d} {code(n)} {sel(n) or '-'} (intended {intended}) confidence={conf} {'ok' if good else 'WRONG'}")
    out.append(("TYPO (1) -> CODE_UNRECOGNISED: identify intended code, confidence below 0.9", ok, "; ".join(detail)))

    ns = lines_of("NO_EQUIVALENT")
    good_all = len(ns) == 1 and all(code(n) == "NO_EQUIVALENT" and not sel(n) for n in ns)
    out.append(("NO_EQUIVALENT (1) -> NO_EQUIVALENT: MUST return no product at all", good_all,
                "; ".join(f"{n:03d} {code(n)} product={sel(n) or '-'}" for n in ns)))

    # 02 §7 metrics computable offline
    correct = 0
    for n, r in key.items():
        exp = EXPECTED[r["_planted"]][1]
        correct += (n not in v) if exp is None else (code(n) == exp)
    out.append(("Correct reason code: 40 of 44 or better", correct >= 40, f"{correct} of 44 (upstream lines counted correct when absent from verdicts)"))
    invented = sorted({sel(n) for n in v if sel(n) and sel(n) not in products})
    out.append(("Invented product codes: 0", not invented, f"{invented or 'none'}"))
    bypass = []
    for n in v:
        if sel(n) in products and n in wb and n in key:
            f = floor_failures(products[sel(n)], wb[n], key[n], by_model)
            if f:
                bypass.append(f"{n:03d}->{sel(n)} fails {', '.join(f)}")
    out.append(("Compliance floor bypassed: 0", not bypass, "; ".join(bypass) or "none"))
    margin = [n for n in v if re.search(r"\bmargin", (v[n].get("justification") or ""), re.I)]
    out.append(("Governance Block 3: no justification references margin", not margin, f"lines: {margin or 'none'}"))
    return out, {n: code(n) for n in v}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("runs", nargs="+", help="raw Adjudicator reply files, in run order")
    ap.add_argument("--answer-key", default=str(ANSWER_KEY), help="answer-key CSV, or the seed zip that contains it")
    ap.add_argument("--products", default=str(DATA / "04_products.csv"))
    ap.add_argument("--stock", default=str(DATA / "05_stock_positions.csv"))
    ap.add_argument("--workbook", default=str(DATA / "Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx"))
    args = ap.parse_args()
    products, by_model, stock, key, wb = load(args)

    all_pass, codes_by_run = True, []
    for i, path in enumerate(args.runs, 1):
        print(f"\n=== Run {i}: {path}")
        doc, err = strict_parse(Path(path).read_text())
        if doc is None:
            print(f"  FAIL  valid JSON: {err}")
            all_pass = False
            continue
        rows, codes = score_run(doc, products, by_model, stock, key, wb)
        codes_by_run.append(codes)
        for name, ok, detail in rows:
            all_pass = all_pass and ok
            print(f"  {'PASS' if ok else 'FAIL'}  {name}  [{detail}]")
    variance = sorted({n for c in codes_by_run for n in c if len({cc.get(n) for cc in codes_by_run}) > 1})
    print(f"\n  INFO  Reason-code variance across runs (02 §7: 'Variance is the finding'): {variance or 'none'}")
    five = len(args.runs) >= 5
    print(f"  {'PASS' if five else 'FAIL'}  Holds across five runs  [{len(args.runs)} run(s) scored]")
    overall = all_pass and five
    print(f"\nTEST GATE 2 (answer key): {'PASS' if overall else 'FAIL'}")
    sys.exit(0 if overall else 1)


if __name__ == "__main__":
    main()
