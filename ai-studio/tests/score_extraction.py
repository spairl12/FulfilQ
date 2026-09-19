#!/usr/bin/env python3
"""Test Gate 1: Schedule Extractor (02 §2 "Gate before moving on").

Scores one or more saved Extractor outputs (one file per run, raw model reply) against the hero
schedule workbook. Every gate item is PASS or FAIL; the overall gate passes only if all items pass.

    python3 ai-studio/tests/score_extraction.py run1.json run2.json run3.json run4.json run5.json

Gate items (02 §2, verbatim):
  - Exactly 44 lines
  - `04DW9001X` comes back with the typo **intact**
  - The three ambiguous lines return empty brand and model, "or equal approved" preserved
  - Penthouse basin lines show 12, not 2 (Total Qty, not per-unit)
  - Valid JSON on five consecutive runs

Data reconciliation (recorded in 02a §9): `04DW9001X` does not appear in the RevC workbook. The planted
typo in meridian-data-v2 (the dataset loaded into the instance) is line 017 `04DW4501X` (answer key
`_planted` = TYPO). The typo item is scored against every TYPO line in the answer key, and the report
names the code it actually checked.
"""
import argparse
import csv
import io
import json
import sys
import zipfile
from pathlib import Path

import openpyxl

REPO = Path(__file__).resolve().parents[2]
DATA = REPO / "meridian-data-v2"  # the dataset loaded into the instance
ANSWER_KEY = REPO / "meridian-seed-data-v2.zip"  # holds the v2 answer key; deliberately not committed
REQUIRED = {
    "lineNumber": int, "itemRef": str, "isAlternate": bool, "alternateVariant": str, "productFamily": str,
    "roomType": str, "unitTier": str, "specifiedText": str, "specifiedBrand": str, "specifiedModel": str,
    "specifiedFinish": str, "quantity": int, "cutoutW": int, "cutoutH": int, "cutoutD": int, "notes": str,
    "extractionConfidence": (int, float),
}


def read_answer_key(path):
    """Answer key from a CSV, or straight from the seed zip (never extracted, never committed)."""
    if path.endswith(".zip"):
        with zipfile.ZipFile(path) as z:
            member = next(n for n in z.namelist() if n.endswith("09_hero_schedule_ANSWER_KEY.csv"))
            text = z.read(member).decode("utf-8-sig")
        return list(csv.DictReader(io.StringIO(text)))
    return list(csv.DictReader(open(path, newline="", encoding="utf-8-sig")))


def read_workbook(path):
    rows = list(openpyxl.load_workbook(path, data_only=True).active.iter_rows(values_only=True))
    header_at = next(i for i, r in enumerate(rows) if r and r[0] == "Item")
    header = list(rows[header_at])
    lines = {}
    for r in rows[header_at + 1:]:
        if not r or r[0] is None or not str(r[0]).strip().isdigit():
            continue
        rec = dict(zip(header, r))
        lines[int(rec["Item"])] = rec
    return lines


def strict_parse(text):
    """The Extractor must return the bare JSON object: no fences, no prose."""
    stripped = text.strip()
    if not stripped.startswith("{") or not stripped.endswith("}"):
        return None, "reply is not a bare JSON object (fences or prose present)"
    try:
        doc = json.loads(stripped)
    except json.JSONDecodeError as e:
        return None, f"JSON decode error: {e}"
    for key in ("extractionStatus", "documentRevision", "lineCount", "lines"):
        if key not in doc:
            return None, f"envelope key missing: {key}"
    for i, line in enumerate(doc["lines"]):
        for key, typ in REQUIRED.items():
            if key not in line:
                return None, f"line index {i}: key missing: {key}"
            if isinstance(line[key], bool) and typ is not bool:
                return None, f"line index {i}: {key} has wrong type"
            if not isinstance(line[key], typ):
                return None, f"line index {i}: {key} has wrong type"
    return doc, ""


def score_run(doc, workbook, key_rows):
    results = []
    by_number = {l["lineNumber"]: l for l in doc["lines"]}
    numbers = sorted(by_number)
    ok = len(doc["lines"]) == 44 and doc["lineCount"] == 44 and numbers == list(range(1, 45))
    results.append(("Exactly 44 lines", ok,
                    f"lines={len(doc['lines'])} lineCount={doc['lineCount']} numbers 1-44 {'complete' if numbers == list(range(1, 45)) else 'incomplete'}"))

    typo_rows = [r for r in key_rows if r["_planted"] == "TYPO"]
    wb_codes = {str(v.get("Model Code") or "") for v in workbook.values()}
    detail, ok = [], bool(typo_rows)
    if "04DW9001X" in wb_codes:
        typo_rows = [{"Item": str(n), "ModelCode": "04DW9001X"} for n, v in workbook.items() if v.get("Model Code") == "04DW9001X"]
    for r in typo_rows:
        got = by_number.get(int(r["Item"]), {}).get("specifiedModel")
        ok = ok and got == r["ModelCode"]
        detail.append(f"line {int(r['Item']):03d} expected {r['ModelCode']} got {got}")
    results.append(("`04DW9001X` comes back with the typo intact (checked: planted TYPO line)", ok, "; ".join(detail)))

    ambiguous = [n for n, v in workbook.items() if not v.get("Specified Brand") and not v.get("Model Code")]
    detail, ok = [], len(ambiguous) == 3
    for n in ambiguous:
        l = by_number.get(n, {})
        good = (l.get("specifiedBrand") == "" and l.get("specifiedModel") == ""
                and "or equal approved" in l.get("specifiedText", ""))
        ok = ok and good
        detail.append(f"line {n:03d} {'ok' if good else 'WRONG'}")
    results.append(('The three ambiguous lines return empty brand and model, "or equal approved" preserved', ok, "; ".join(detail)))

    penthouse = [n for n, v in workbook.items() if v.get("Unit Type") == "Penthouse" and "Basin" in str(v.get("Description"))
                 and v.get("Qty / Unit") not in (None, 1)]
    detail, ok = [], bool(penthouse)
    for n in penthouse:
        expected, got = workbook[n]["Total Qty"], by_number.get(n, {}).get("quantity")
        ok = ok and got == expected
        detail.append(f"line {n:03d} expected {expected} got {got}")
    results.append(("Penthouse basin lines show 12, not 2 (Total Qty, not per-unit)", ok, "; ".join(detail)))
    return results


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("runs", nargs="+", help="raw Extractor reply files, in run order")
    ap.add_argument("--workbook", default=str(DATA / "Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx"))
    ap.add_argument("--answer-key", default=str(ANSWER_KEY), help="answer-key CSV, or the seed zip that contains it")
    args = ap.parse_args()
    workbook = read_workbook(args.workbook)
    key_rows = read_answer_key(args.answer_key)

    all_pass, valid_streak, best_streak = True, 0, 0
    for i, path in enumerate(args.runs, 1):
        doc, err = strict_parse(Path(path).read_text())
        print(f"\n=== Run {i}: {path}")
        if doc is None:
            print(f"  FAIL  valid JSON: {err}")
            valid_streak, all_pass = 0, False
            continue
        valid_streak += 1
        best_streak = max(best_streak, valid_streak)
        print("  PASS  valid JSON")
        for name, ok, detail in score_run(doc, workbook, key_rows):
            all_pass = all_pass and ok
            print(f"  {'PASS' if ok else 'FAIL'}  {name}  [{detail}]")
    five = best_streak >= 5
    print(f"\n  {'PASS' if five else 'FAIL'}  Valid JSON on five consecutive runs  [longest valid streak: {best_streak}]")
    overall = all_pass and five
    print(f"\nTEST GATE 1 (extraction): {'PASS' if overall else 'FAIL'}")
    sys.exit(0 if overall else 1)


if __name__ == "__main__":
    main()
