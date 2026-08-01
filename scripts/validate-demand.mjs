/**
 * Validation rule: no demand row may reference a persona-owned category.
 * Owned: Dairy, Fruits & vegetables, Bread & eggs, Staples, Snacks
 * (derived from catalog products with owned: true).
 */
import fs from "fs";

const catalog = JSON.parse(fs.readFileSync("data/catalog.json", "utf8"));
const demand = JSON.parse(fs.readFileSync("data/demand.json", "utf8"));

const ownedCategories = new Set(
  catalog.products.filter((p) => p.owned).map((p) => p.category),
);

const BLOCKED = [
  "Dairy",
  "Fruits & vegetables",
  "Bread & eggs",
  "Staples",
  "Snacks",
  "Eggs", // overlaps persona Bread & eggs habit
];

let failed = false;

for (const row of demand) {
  if (ownedCategories.has(row.category) || BLOCKED.includes(row.category)) {
    console.error(
      `FAIL: demand row "${row.id}" uses owned/blocked category "${row.category}"`,
    );
    failed = true;
    continue;
  }
  const ownedInCat = catalog.products.some(
    (p) => p.category === row.category && p.owned,
  );
  if (ownedInCat) {
    console.error(
      `FAIL: demand row "${row.id}" category "${row.category}" has owned products`,
    );
    failed = true;
  }
  const hasProducts = catalog.products.some(
    (p) => p.category === row.category && !p.owned,
  );
  if (!hasProducts) {
    console.error(
      `FAIL: demand row "${row.id}" has no unexplored catalog products`,
    );
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  `OK: ${demand.length} demand rows — none overlap owned categories:`,
  [...ownedCategories].join(", "),
);
