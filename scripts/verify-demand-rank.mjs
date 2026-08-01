import demand from "../data/demand.json" with { type: "json" };
import catalog from "../data/catalog.json" with { type: "json" };

function rankDemand(items, active, limit = 4) {
  const byOrders = (a, b) => b.orders - a.orders;
  if (active === "always") {
    return items
      .filter((i) => i.contexts.includes("always"))
      .sort(byOrders)
      .slice(0, limit);
  }
  const matched = items
    .filter((i) => i.contexts.includes(active))
    .sort(byOrders);
  if (matched.length >= 3) return matched.slice(0, limit);
  const matchedIds = new Set(matched.map((i) => i.id));
  const fillers = items
    .filter((i) => i.contexts.includes("always") && !matchedIds.has(i.id))
    .sort(byOrders);
  return [...matched, ...fillers].slice(0, limit);
}

for (const ctx of ["late_night", "rainy", "festival", "morning", "always"]) {
  const rows = rankDemand(demand, ctx);
  console.log(
    "\n" + ctx,
    "→",
    rows.map((r) => `${r.category} (${r.window}, ${r.orders})`).join(" | "),
  );
}

const demandCats = new Set(demand.map((d) => d.category));
for (const cat of demandCats) {
  const products = catalog.products.filter((p) => p.category === cat);
  const owned = products.some((p) => p.owned);
  const count = products.length;
  if (owned) console.log("OWNED LEAK", cat);
  if (count < 2) console.log("FEW PRODUCTS", cat, count);
}
console.log("\nok — all demand cats unexplored with products");
