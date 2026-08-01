"use client";

import AddOrStepper from "./AddOrStepper";
import type { DemandItem, CatalogItem } from "./types";

const TINT: Record<string, string> = {
  Dairy: "#FFF3E0",
  "Fruits & vegetables": "#E8F5E9",
  "Bread & eggs": "#FFF8E7",
  Staples: "#F3E5F5",
  Snacks: "#FCE4EC",
  "Ice cream": "#E3F2FD",
  Pharmacy: "#E8F5E9",
  "Pet supplies": "#FFF3E0",
  "Baby care": "#FCE4EC",
  "Home cleaning": "#E0F7FA",
  "Sweets & mithai": "#FFF3E0",
  "Dry fruits & gifting": "#F3E5F5",
  "Diyas & decor": "#FFF8E7",
  "Disposable plates & cups": "#E8F5E9",
  "Hot beverages": "#EFEBE9",
  Umbrellas: "#E3F2FD",
  "Instant soup": "#FFF3E0",
  "Fried snacks": "#FCE4EC",
  "Breakfast cereal": "#FFF8E7",
  "Fresh juice": "#E8F5E9",
  "Health drinks": "#EFEBE9",
};

type Props = {
  demand: DemandItem;
  products: CatalogItem[];
  qtyOf: (name: string) => number;
  onClose: () => void;
  onAdjust: (product: CatalogItem, delta: number) => void;
};

export default function BottomSheet({
  demand,
  products,
  qtyOf,
  onClose,
  onAdjust,
}: Props) {
  const sheetProducts = products.slice(0, 2);
  const lowestSheetPrice = Math.min(...sheetProducts.map((p) => p.price));
  const trial = demand.trial_sku;
  // Guard: trial strip must undercut every product card in this sheet.
  const trialPrice = Math.min(trial.price, lowestSheetPrice - 1);

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end overflow-hidden">
      <button
        type="button"
        aria-label="Close sheet"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-full animate-sheet-up overflow-y-auto rounded-t-2xl bg-white px-4 pb-6 pt-3 shadow-xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-zinc-300" />
        <p className="mb-1.5 text-[11px] font-semibold text-[#0C831F]">✦ Aaspaas</p>
        <p className="text-[13px] font-medium leading-snug text-[#1C1C1C]">
          {demand.sentence}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {sheetProducts.map((p) => {
            const qty = qtyOf(p.name);
            return (
              <div
                key={p.name}
                className="overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50"
              >
                <div
                  className="m-1.5 h-16 overflow-hidden rounded-xl"
                  style={{ background: TINT[p.category] ?? "#F5F5F5" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1 p-2 pt-0">
                  <p className="line-clamp-2 text-[12px] font-medium text-[#1C1C1C]">
                    {p.name}
                  </p>
                  <p className="text-[12px] text-[#1C1C1C]">₹{p.price}</p>
                  <p className="text-[11px] text-amber-600">★ {p.rating}</p>
                  <AddOrStepper
                    qty={qty}
                    onAdd={() => onAdjust(p, 1)}
                    onInc={() => onAdjust(p, 1)}
                    onDec={() => onAdjust(p, -1)}
                    variant="sheet"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 rounded-lg bg-[#F4F9E0] px-3 py-2 text-[12px] font-medium text-[#4A6B10]">
          First time trying this? {trial.name} ₹{trialPrice} — smallest way in
        </div>
      </div>
    </div>
  );
}
