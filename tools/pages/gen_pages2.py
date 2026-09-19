import gen_pages as g, json
EXTRA = {
  "SPAIQuote": dict(form="SPAIQuotes_FormPage", list="SPAIQuotes_ListPage",
    profile=[("SPAINumber","T"),("SPAIOpportunity","K")], general=[("SPAIAccount","K"),("SPAIAmount","M")],
    columns=[("SPAINumber","T"),("SPAIOpportunity","K"),("SPAIAccount","K"),("SPAIAmount","M")]),
  "SPAIQuoteLine": dict(form="SPAIQuoteLines_FormPage", list="SPAIQuoteLines_ListPage",
    profile=[("SPAIProduct","K"),("SPAIQuote","K")], general=[("SPAIQuantity","N"),("SPAIPrice","M"),("SPAIAmount","M")],
    columns=[("SPAIQuote","K"),("SPAIProduct","K"),("SPAIQuantity","N"),("SPAIPrice","M"),("SPAIAmount","M")]),
  "SPAILineSource": dict(form="SPAILineSources_FormPage", list="SPAILineSources_ListPage",
    profile=[("SPAILocation","K"),("SPAIScheduleLine","K")],
    general=[("SPAIQtyAllocated","I"),("SPAISourceTier","K"),("SPAIInterstateFreight","B"),("SPAIAllocatedOn","DT")],
    columns=[("SPAIScheduleLine","K"),("SPAILocation","K"),("SPAISourceTier","K"),("SPAIQtyAllocated","I"),
             ("SPAIInterstateFreight","B"),("SPAIAllocatedOn","DT")]),
}
for e,p in EXTRA.items():
    fb,_=g.form_body(e,p); open(f"{g.D}/{p['form']}.js","w").write(fb); open(f"{g.D}/{p['list']}.js","w").write(g.list_body(e,p)); print(p['form'],p['list'])
