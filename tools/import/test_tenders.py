"""Test and demo tenders for The Adjudicator (2026-09-30).

Seven fictional tenders, each with its own Opportunity, builder contact, tender code (TND-26-NNNN: the short
year keeps AI Studio's PII masking from reading the code as a phone number), delivery programme, schedule
workbook and award email. Nothing is shared between them except stock, which the snapshot/restore steps
put back exactly before every run that matters.

Steps (python3 test_tenders.py <step> [--apply]); nothing writes to the instance without --apply:
  plan            print what would be created
  files           write the schedule workbooks and award emails to ai-studio/tests/tenders/ (local only)
  build           create the Opportunities, contact roles, call-up schedules and delivery events
  snapshot        save every stock position's available/allocated figures to stock_snapshot.json (read only)
  restore         put stock back to the snapshot (only positions that differ)
  report          read-only cleanup report: tenders and records outside the seed and the seven below
  rename_corvina  retitle Corvina "Corvina Quarter Stage 2 (rehearsal 29 Sep)"
Ids are deterministic (uuid5), so build is re-runnable and skips what already exists.
"""
import datetime, json, os, re, sys, zipfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from imp import (select, gid, insert_rows, run_batch, update_q, rows, rows4, T, I, M, D, L, B,
                 SUPERVISOR_CONTACT, EVENT_TYPE, OPP_ROLE, lookup_map)

APPLY = "--apply" in sys.argv
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "ai-studio", "tests", "tenders")
SNAPSHOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "stock_snapshot.json")
STAGE_NOT_STARTED = "c2067b11-0ee0-df11-971b-001d60e938c6"
TEMPLATES = {
    "small": os.path.join(ROOT, "ai-studio", "tests", "sample", "Bellweather_Court_Stage2_Finishes_Schedule_RevB.xlsx"),
    "medium": os.path.join(ROOT, "ai-studio", "tests", "sample", "Aldworth_Rise_Stage1_Finishes_Schedule_RevA.xlsx"),
    "full": os.path.join(ROOT, "meridian-data-v2", "Corvina_Quarter_Stage2_Finishes_Schedule_RevC.xlsx"),
}
ACCOUNTS = {  # head contractor -> (account code, builder contact code, contact name, state)
    "Halloran Bright Constructions": ("ACC-001", "CON-001", "Dana Whitlock", "VIC"),
    "Penhale Constructions": ("ACC-003", "CON-008", "Aurel Danecki", "VIC"),
    "Verrin Group": ("ACC-002", "CON-007", "Nell Braithwood", "NSW"),
}
TENDERS = [  # use, code, title, contractor, suburb, dwellings, template, programme, value, PO, revision
    ("Test round 1", "TND-26-0201", "Ashcombe Wharf Stage 1", "Halloran Bright Constructions", "Williamstown VIC", 48, "small", "short", 1250000, "BPO-0501", "B"),
    ("Test round 2", "TND-26-0202", "Fenwick Lane Stage 2", "Penhale Constructions", "Northcote VIC", 48, "small", "short", 1250000, "BPO-0502", "B"),
    ("Buffer", "TND-26-0203", "Carrow Mews Stage 1", "Verrin Group", "Marrickville NSW", 48, "small", "short", 1250000, "BPO-0503", "B"),
    ("Demo, recorded take", "TND-26-0204", "Tarrant Quay Stage 2", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0504", "C"),
    ("Demo, retake spare", "TND-26-0205", "Tarrant Quay Stage 3", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0505", "C"),
    ("Judges 1", "TND-26-0206", "Wyvern Gardens Stage 1", "Penhale Constructions", "Brunswick East VIC", 24, "medium", "medium", 640000, "BPO-0506", "A"),
    ("Judges 2", "TND-26-0207", "Ostler Rise Stage 1", "Verrin Group", "Parramatta NSW", 24, "medium", "medium", 640000, "BPO-0507", "A"),
    ("Demo, retake 2", "TND-26-0208", "Tarrant Quay Stage 4", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0508", "C"),
    ("Demo, retake 3", "TND-26-0209", "Tarrant Quay Stage 5", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0509", "C"),
    ("Demo, retake 4", "TND-26-0210", "Tarrant Quay Stage 6", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0510", "C"),
    ("Demo, retake 5", "TND-26-0211", "Tarrant Quay Stage 7", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0511", "C"),
    ("Demo, retake 6", "TND-26-0212", "Tarrant Quay Stage 8", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0512", "C"),
    ("Demo, retake 7", "TND-26-0213", "Tarrant Quay Stage 9", "Halloran Bright Constructions", "Port Melbourne VIC", 180, "full", "full", 8150000, "BPO-0513", "C"),
]
ISSUED, CLOSES = datetime.date(2026, 9, 29), datetime.date(2026, 10, 9)
APPLIANCES = "Appliance package: ovens, cooktops, dishwashers, rangehoods, microwaves"
PLUMBING = "Plumbing and sanitaryware: basins, toilet suites, mixers, shower sets"


def digits(code): return code.split("-")[-1]


def programme(t):
    """(schedule ref, description, events[(code, seq, label, type, date, window)]) for each call-up schedule."""
    code, kind = t[1], t[7]
    d = digits(code)
    if kind == "full":  # Corvina's 49-event programme, four weeks later
        shift = datetime.timedelta(days=28)
        sched = {"01": [], "02": []}
        for e in rows4("21_corvina_events.csv"):
            part = e["ScheduleRef"][-2:]
            day = datetime.date.fromisoformat(e["ScheduledOn"]) + shift
            sched[part].append((f"SCH-{d}-{part}-E{int(e['Sequence']):02d}", int(e["Sequence"]), e["Label"], e["EventType"], day, e["WindowCode"]))
    else:
        levels = 4 if kind == "short" else 6
        sched = {"01": [(f"SCH-{d}-01-E00", 0, "Onsite prototype", "Prototype", datetime.date(2026, 11, 20), "W0")], "02": []}
        for lvl in range(1, levels + 1):
            sched["01"].append((f"SCH-{d}-01-E{lvl:02d}", lvl, f"Level {lvl}", "Level rollout",
                                datetime.date(2027, 2, 15) + datetime.timedelta(days=12 * (lvl - 1)), "W1"))
            sched["02"].append((f"SCH-{d}-02-E{lvl:02d}", lvl, f"Level {lvl}", "Level rollout",
                                datetime.date(2027, 1, 11) + datetime.timedelta(days=12 * (lvl - 1)), "W1"))
    return [(f"SCH-{d}-01", APPLIANCES, sched["01"]), (f"SCH-{d}-02", PLUMBING, sched["02"])]


def plan():
    for t in TENDERS:
        progs = programme(t)
        first = min(e[4] for _, _, ev in progs for e in ev)
        print(f"{t[0]:<20} {t[1]}  {t[2]:<24} {t[3]:<30} {ACCOUNTS[t[3]][2]:<16} {t[4]:<20} "
              f"{t[6]:<6} rev {t[10]}  {sum(len(ev) for _, _, ev in progs):>2} events from {first}  PO {t[9]}")


def files():
    os.makedirs(OUT, exist_ok=True)
    for t in TENDERS:
        use, code, title, contractor, suburb, dwellings, tpl, _, _, po, rev = t
        src = zipfile.ZipFile(TEMPLATES[tpl])
        sheet = src.read("xl/worksheets/sheet1.xml").decode("utf-8")
        sheet = re.sub(r"Project:\s+[^<|]+\|\s+\d+ Dwellings\s+\|\s+[^<]+",
                       f"Project:  {title}  |  {dwellings} Dwellings  |  {suburb}", sheet, count=1)
        sheet = re.sub(r"Tender No: TND-[0-9-]+\s+Issued: [0-9/]+\s+Closes: [0-9/]+",
                       f"Tender No: {code}     Issued: {ISSUED:%d/%m/%Y}     Closes: {CLOSES:%d/%m/%Y}", sheet, count=1)
        if title not in sheet or code not in sheet:
            raise SystemExit(f"template rewrite failed for {code}")
        base = f"{title.replace(' ', '_')}_Tender_Schedule_Rev{rev}"
        dest = os.path.join(OUT, f"{code} {use}")
        os.makedirs(dest, exist_ok=True)
        workbook = src.read("xl/workbook.xml").decode("utf-8").replace('name="Finishes Schedule"', 'name="Tender Schedule"')
        with zipfile.ZipFile(os.path.join(dest, base + ".xlsx"), "w", zipfile.ZIP_DEFLATED) as z:
            for item in src.infolist():
                if item.filename == "xl/worksheets/sheet1.xml":
                    z.writestr(item, sheet.encode("utf-8"))
                elif item.filename == "xl/workbook.xml":
                    z.writestr(item, workbook.encode("utf-8"))
                else:
                    z.writestr(item, src.read(item.filename))
        contact = ACCOUNTS[contractor][2]
        first = min(e[4] for _, _, ev in programme(t) for e in ev)
        domain = contractor.split()[0].lower() + ".example"
        eml = (f"From: {contact} <{contact.split()[0].lower()}@{domain}>\nTo: Commercial Orders <orders@meridiancommercial.example>\n"
               f"Date: Wed, 30 Sep 2026 09:00:00 +1000\nSubject: PO {po} - {title} - award of tender {code}\nMIME-Version: 1.0\n"
               f"Content-Type: text/plain; charset=\"utf-8\"\n\nHi Meridian Commercial team,\n\n"
               f"We are pleased to confirm award of tender {code} for {title}. Please find our blanket purchase order {po}.\n\n"
               f"Deliveries follow the construction programme issued with the tender, starting {first:%d/%m/%Y}.\n\n"
               f"Kind regards,\n{contact}\n{contractor} (fictional)\n")
        open(os.path.join(dest, f"{po}_award_email.eml"), "w").write(eml)
        print(f"{code}: {dest}")


def build():
    ast = lookup_map("SPAIAdjudicationStatus")
    ds = {}
    opps, links, scheds, events = [], [], [], []
    for t in TENDERS:
        use, code, title, contractor, suburb, dwellings, _, _, value, _, _ = t
        acc_code, con_code, _, state = ACCOUNTS[contractor]
        opp = gid("opp", code)
        opps.append((opp, {"Title": T(title), "SPAIProjectName": T(title), "SPAITenderCode": T(code),
            "Account": L(gid("acc", acc_code)), "Contact": L(gid("con", con_code)), "Owner": L(SUPERVISOR_CONTACT),
            "Stage": L(STAGE_NOT_STARTED), "Amount": M(value), "SPAIDwellingCount": I(dwellings),
            "SPAITenderCloseOn": D(CLOSES.isoformat()), "SPAIScheduleReceivedOn": D(ISSUED.isoformat()),
            "SPAIAdjudicationStatus": L(ast["Not started"]), "SPAIProjectState": T(state)}))
        links.append((gid("oppcon", f"{code}:{con_code}"), {"Opportunity": L(opp), "Contact": L(gid("con", con_code)),
            "Role": L(OPP_ROLE["Builder contact"]), "IsMainContact": B(True)}))
        for ref, desc, evs in programme(t):
            scheds.append((gid("sch", ref), {"SPAIScheduleRef": T(ref), "SPAIDescription": T(desc), "SPAIOpportunity": L(opp)}))
            for ecode, seq, label, etype, day, win in evs:
                events.append((gid("evt", ecode), {"SPAILabel": T(label), "SPAIEventCode": T(ecode),
                    "SPAICallUpSchedule": L(gid("sch", ref)), "SPAISequence": I(seq), "SPAIEventType": L(EVENT_TYPE[etype]),
                    "SPAIScheduledOn": D(day.isoformat()), "SPAIDeliveryWindow": L(gid("win", win))}))
    print(f"would create: {len(opps)} opportunities, {len(links)} contact roles, {len(scheds)} call-up schedules, {len(events)} delivery events")
    if not APPLY:
        print("DRY RUN: nothing written. Re-run with --apply.")
        return
    insert_rows("Opportunity", opps, "test tenders")
    insert_rows("OpportunityContact", links, "test tender contact roles")
    insert_rows("SPAICallUpSchedule", scheds, "test tender call-up schedules")
    insert_rows("SPAIDeliveryEvent", events, "test tender delivery events")


def stock_rows():
    return select("SPAIStockPosition", ["SPAIQtyAvailable", "SPAIQtyAllocated"])


def snapshot():
    data = {r["Id"]: [r["SPAIQtyAvailable"], r["SPAIQtyAllocated"]] for r in stock_rows()}
    json.dump({"taken": datetime.datetime.now().isoformat(timespec="seconds"), "positions": data}, open(SNAPSHOT, "w"))
    print(f"snapshot: {len(data)} stock positions saved to {SNAPSHOT}")


def restore():
    snap = json.load(open(SNAPSHOT))
    now = {r["Id"]: [r["SPAIQtyAvailable"], r["SPAIQtyAllocated"]] for r in stock_rows()}
    diff = [(i, v) for i, v in snap["positions"].items() if now.get(i) != v]
    print(f"snapshot taken {snap['taken']}: {len(diff)} of {len(snap['positions'])} positions differ and would be restored")
    for i, v in diff[:10]:
        print(f"  {i}: now {now.get(i)} -> {v}")
    if not APPLY:
        print("DRY RUN: nothing written. Re-run with --apply.")
        return
    run_batch("SPAIStockPosition", [update_q("SPAIStockPosition", i, {"SPAIQtyAvailable": I(v[0]), "SPAIQtyAllocated": I(v[1])})
                                    for i, v in diff], "stock restored to snapshot")


def report():
    keep = {r["TenderCode"] for r in rows("07_tenders.csv")} | {t[1] for t in TENDERS}
    def eq(col, val):
        return {"filterType": 6, "logicalOperation": 0, "isEnabled": True, "items": {"f": {"filterType": 1, "comparisonType": 3,
            "isEnabled": True, "leftExpression": {"expressionType": 0, "columnPath": col},
            "rightExpression": {"expressionType": 2, "parameter": {"dataValueType": 0, "value": val}}}}}
    lines = select("SPAIScheduleLine", ["SPAIOpportunity", "SPAIOpportunity.Title", "SPAIOpportunity.SPAITenderCode"])
    by_opp = {}
    for r in lines:
        o = (r["SPAIOpportunity"] or {}).get("value")
        by_opp.setdefault(o, [r["SPAIOpportunity.Title"], r["SPAIOpportunity.SPAITenderCode"], 0])[2] += 1
    print("Opportunities holding schedule lines:")
    for o, (title, code, n) in sorted(by_opp.items(), key=lambda kv: kv[1][0] or ""):
        seeded = code in keep
        orders = len(select("Order", ["Id"], eq("Opportunity", o)))
        srcs = len(select("SPAILineSource", ["Id"], eq("SPAIScheduleLine.SPAIOpportunity", o)))
        ledger = len(select("SPAIDecisionLedger", ["Id"], eq("SPAIOpportunity", o)))
        print(f"  {'keep ' if seeded else 'CHECK'} {title!r:<48} code={code!r:<16} lines={n:<3} sources={srcs:<3} orders={orders:<3} ledger={ledger}")
    print("Stock vs seed:")
    seed = {gid("stk", r["StockCode"]): (int(r["QtyAvailable"]), int(r["QtyAllocated"])) for r in rows("05_stock_positions.csv")}
    off = [r for r in stock_rows() if r["Id"] in seed and (r["SPAIQtyAvailable"], r["SPAIQtyAllocated"]) != seed[r["Id"]]]
    print(f"  {len(off)} of {len(seed)} positions differ from the seeded figures")


def rename_corvina():
    opp = gid("opp", "TND-2026-0141")
    print(f"would retitle {opp} to 'Corvina Quarter Stage 2 (rehearsal 29 Sep)'")
    if not APPLY:
        print("DRY RUN: nothing written. Re-run with --apply.")
        return
    run_batch("Opportunity", [update_q("Opportunity", opp, {"Title": T("Corvina Quarter Stage 2 (rehearsal 29 Sep)")})], "rename Corvina")


if __name__ == "__main__":
    steps = {"plan": plan, "files": files, "build": build, "snapshot": snapshot, "restore": restore, "report": report,
             "rename_corvina": rename_corvina}
    for s in [a for a in sys.argv[1:] if not a.startswith("--")]:
        steps[s]()
