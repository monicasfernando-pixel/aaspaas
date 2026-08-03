"use client";

import { useRef } from "react";
import AddOrStepper from "./AddOrStepper";
import BrandMark from "./BrandMark";
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

const SWIPE_CLOSE_PX = 64;

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
  const trialPrice = Math.min(trial.price, lowestSheetPrice - 1);

  const dragStartY = useRef<number | null>(null);

  function onDragStart(clientY: number) {
    dragStartY.current = clientY;
  }

  function onDragEnd(clientY: number) {
    if (dragStartY.current == null) return;
    if (clientY - dragStartY.current >= SWIPE_CLOSE_PX) onClose();
    dragStartY.current = null;
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end overflow-hidden">
      {/* Full-frame scrim — includes the zone the keyboard occupied */}
      <button
        type="button"
        aria-label="Dismiss sheet"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[85%] flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl animate-sheet-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative shrink-0 cursor-grab px-4 pb-1 pt-3 active:cursor-grabbing select-none"
          onTouchStart={(e) => onDragStart(e.touches[0].clientY)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientY)}
          onMouseDown={(e) => onDragStart(e.clientY)}
          onMouseUp={(e) => onDragEnd(e.clientY)}
          onMouseLeave={() => {
            dragStartY.current = null;
          }}
        >
          <div className="mx-auto h-1 w-10 rounded-full bg-zinc-300" />
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-2.5 flex h-8 w-8 items-center justify-center rounded-full text-[18px] leading-none text-[#7E8794] hover:bg-zinc-100 hover:text-[#1C1C1C]"
          >
            ✕
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 pt-1">
          <p className="mb-1.5 text-[13px]">
            <BrandMark />
          </p>
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
    </div>
  );
}
