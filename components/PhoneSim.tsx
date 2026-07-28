"use client";

import { useEffect, useMemo, useState } from "react";
import demandData from "@/data/demand.json";
import catalogData from "@/data/catalog.json";
import BottomSheet from "./BottomSheet";
import type {
  DemandItem,
  CatalogItem,
  CartItem,
  Screen,
} from "./types";

const demand = demandData as DemandItem[];
const catalog = (catalogData as { products: CatalogItem[] }).products;

const RECENT = ["dosa ma", "banan", "oil", "dosa batter", "milk"];
const TOP_PICKS = catalog.filter((p) => p.owned).slice(0, 6);
const CATS = ["All", "Kids", "Electronics", "Beauty", "Pharmacy"];
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
};
const FREQ = [
  { label: "Favourites", tint: "#E8F0FE", emoji: "🥛", cats: ["Dairy", "Bread & eggs"] },
  { label: "Fruits & vegetables", tint: "#E8F5E9", emoji: "🥦", cats: ["Fruits & vegetables"] },
  { label: "Dairy", tint: "#FFF3E0", emoji: "🥛", cats: ["Dairy"] },
  { label: "Staples", tint: "#F3E5F5", emoji: "🌾", cats: ["Staples"] },
  { label: "Snacks", tint: "#FCE4EC", emoji: "🍟", cats: ["Snacks"] },
  { label: "Bread & eggs", tint: "#FFF8E7", emoji: "🍞", cats: ["Bread & eggs"] },
];

function EmojiTile({
  emoji,
  tint,
  size,
  className = "",
}: {
  emoji: string;
  tint: string;
  size: 28 | 34;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl ${className}`}
      style={{ background: tint }}
    >
      <span style={{ fontSize: size }} aria-hidden>
        {emoji}
      </span>
    </div>
  );
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return <span className="font-semibold text-[#1C1C1C]">{text}</span>;
  return (
    <span>
      {text.slice(0, i)}
      <span className="text-[#7E8794]">{text.slice(i, i + query.length)}</span>
      <span className="font-semibold text-[#1C1C1C]">
        {text.slice(i + query.length)}
      </span>
    </span>
  );
}

function ProductCard({
  product,
  onAdd,
  why,
}: {
  product: CatalogItem;
  onAdd?: () => void;
  why?: string;
}) {
  const mrp = Math.round(product.price * 1.25);
  return (
    <div className="w-[140px] shrink-0">
      <div className="overflow-hidden rounded-2xl bg-white">
        <EmojiTile
          emoji={product.emoji}
          tint={TINT[product.category] ?? "#F5F5F5"}
          size={34}
          className="m-1.5 h-[96px]"
        />
        <div className="flex items-center justify-between gap-1 px-2 py-1.5">
          <span className="text-[11px] text-[#1C1C1C]">1 pc</span>
          <button
            type="button"
            onClick={onAdd}
            className="rounded-lg border-[1.5px] border-[#0C831F] px-3 py-0.5 text-[12px] font-bold uppercase text-[#0C831F]"
          >
            ADD
          </button>
        </div>
      </div>
      <div className="mt-1.5 space-y-0.5 px-0.5">
        <p className="text-[13px] font-bold text-[#1C1C1C]">
          ₹{product.price}{" "}
          <span className="text-[11px] font-normal text-[#7E8794] line-through">
            ₹{mrp}
          </span>
        </p>
        <p className="line-clamp-2 text-[12px] leading-snug text-[#1C1C1C]">
          {product.name}
        </p>
        <p className="text-[11px] text-amber-500">
          ★ {product.rating}{" "}
          <span className="text-[#7E8794]">({Math.round(product.rating * 200)})</span>
        </p>
        <p className="text-[11px] text-[#7E8794]">⏱ 13 mins</p>
        {why && (
          <p className="pt-0.5 text-[11px] leading-snug text-[#7E8794]">{why}</p>
        )}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="shrink-0 bg-[#F8CB46] px-3.5 pb-3 pt-3">
      <p className="text-[17px] font-bold leading-tight text-[#1C1C1C]">
        Blinkit in 13 minutes
      </p>
      <p className="mt-0.5 text-[11px] font-medium text-[#1C1C1C]/70">
        HOME - Flat 43 ▾
      </p>
    </div>
  );
}

function BottomNav({
  active,
  cartCount,
  onHome,
  onCart,
}: {
  active: "home" | "cart";
  cartCount: number;
  onHome: () => void;
  onCart: () => void;
}) {
  return (
    <div className="shrink-0 border-t border-zinc-100 bg-white px-2 pb-3 pt-1.5">
      <div className="flex items-center justify-around">
        {[
          { id: "home", label: "Home", onClick: onHome },
          { id: "categories", label: "Categories", onClick: () => {} },
          { id: "print", label: "Print", onClick: () => {} },
          { id: "cart", label: "Cart", onClick: onCart },
        ].map((item) => {
          const isOn =
            (item.id === "home" && active === "home") ||
            (item.id === "cart" && active === "cart");
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-[10px] font-medium ${
                isOn ? "bg-[#F8CB46]/50 text-[#1C1C1C]" : "text-[#7E8794]"
              }`}
            >
              <span className="text-[16px]" aria-hidden>
                {item.id === "home"
                  ? "⌂"
                  : item.id === "categories"
                    ? "▦"
                    : item.id === "print"
                      ? "⎙"
                      : "🛒"}
              </span>
              {item.label}
              {item.id === "cart" && cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0C831F] px-1 text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PhoneSim() {
  const [screen, setScreen] = useState<Screen>("home");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeDemand, setActiveDemand] = useState<DemandItem | null>(null);
  const [recents, setRecents] = useState(RECENT);
  const [toast, setToast] = useState<string | null>(null);
  const [orderDiscovery, setOrderDiscovery] = useState<string | null>(null);
  const [netLoading, setNetLoading] = useState(false);
  const [netResult, setNetResult] = useState<{
    error?: boolean;
    intent?: string;
    substitutes?: Array<{ name: string; why: string }>;
    confidence?: "high" | "low";
    catalogSize?: number;
  } | null>(null);

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cart.reduce((n, i) => n + i.price * i.qty, 0);

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      q ? catalog.filter((p) => p.name.toLowerCase().includes(q)).slice(0, 8) : [],
    [q],
  );
  const showIceHint = q.startsWith("ice");
  const iceDemand = demand.find((d) => d.id === "ice-cream")!;

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!q || matches.length > 0) {
      setNetLoading(false);
      setNetResult(null);
      return;
    }
    let cancelled = false;
    setNetLoading(true);
    setNetResult(null);
    fetch("/api/net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query.trim() }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setNetResult(data);
      })
      .catch(() => {
        if (!cancelled) setNetResult({ error: true });
      })
      .finally(() => {
        if (!cancelled) setNetLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [q, matches.length, query]);

  function openDemand(item: DemandItem) {
    setActiveDemand(item);
  }

  function productsFor(item: DemandItem) {
    return catalog.filter((p) => p.category === item.category);
  }

  function onQueryChange(value: string) {
    setQuery(value);
    setActiveDemand(null);
  }

  function addToCart(product: CatalogItem, viaAaspaas: boolean) {
    setCart((prev) => {
      const hit = prev.find((i) => i.name === product.name);
      if (hit) {
        return prev.map((i) =>
          i.name === product.name
            ? { ...i, qty: i.qty + 1, viaAaspaas: i.viaAaspaas || viaAaspaas }
            : i,
        );
      }
      return [
        ...prev,
        {
          name: product.name,
          category: product.category,
          price: product.price,
          qty: 1,
          viaAaspaas,
        },
      ];
    });
    if (viaAaspaas) {
      setToast("Added — first time from this category");
    }
  }

  function placeOrder() {
    const discovered = cart.find((i) => i.viaAaspaas);
    setOrderDiscovery(discovered?.category ?? null);
    setActiveDemand(null);
    setScreen("order");
  }

  function startOver() {
    setScreen("home");
    setQuery("");
    setCart([]);
    setActiveDemand(null);
    setToast(null);
    setOrderDiscovery(null);
    setRecents(RECENT);
    setNetLoading(false);
    setNetResult(null);
  }

  return (
    <div className="relative isolate flex h-full w-full flex-col overflow-hidden bg-[#FAF7EC] text-[#1C1C1C]">
      {/* —— HOME —— */}
      {screen === "home" && (
        <>
          <Header />
          <div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-3 pt-3">
            <button
              type="button"
              onClick={() => setScreen("search")}
              className="flex w-full items-center rounded-full bg-white px-4 py-2.5 text-left text-[13px] text-[#7E8794] shadow-sm ring-1 ring-zinc-200/80"
            >
              Search for atta, dal, coke and more
            </button>

            <div className="-mx-3.5 mt-3 flex gap-1 overflow-x-auto px-3.5 pb-1">
              {CATS.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  className={`shrink-0 px-3 py-2 text-[12px] font-medium ${
                    i === 0
                      ? "border-b-2 border-[#1C1C1C] text-[#1C1C1C]"
                      : "text-[#7E8794]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <h2 className="mb-3 mt-5 text-[20px] font-bold text-[#1C1C1C]">
              Frequently bought
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {FREQ.map((tile, i) => {
                const samples = catalog
                  .filter((p) => tile.cats.includes(p.category) && p.owned)
                  .slice(0, 2);
                return (
                  <div
                    key={tile.label}
                    className="overflow-hidden rounded-2xl bg-white p-2.5 shadow-sm"
                  >
                    <div
                      className="mb-2 flex h-16 items-center justify-center gap-1.5 rounded-xl"
                      style={{ background: tile.tint }}
                    >
                      {(samples.length ? samples : [{ emoji: tile.emoji, name: tile.label }]).map(
                        (s) => (
                          <EmojiTile
                            key={s.name}
                            emoji={"emoji" in s ? s.emoji : tile.emoji}
                            tint="#ffffffcc"
                            size={28}
                            className="h-10 w-10"
                          />
                        ),
                      )}
                      <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[9px] font-medium text-[#7E8794]">
                        +{8 + i * 2} more
                      </span>
                    </div>
                    <p className="text-[12px] font-semibold text-[#1C1C1C]">
                      {tile.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <BottomNav
            active="home"
            cartCount={cartCount}
            onHome={() => setScreen("home")}
            onCart={() => setScreen("cart")}
          />
        </>
      )}

      {/* —— SEARCH —— */}
      {screen === "search" && (
        <>
          <Header />
          <div className="shrink-0 bg-[#FAF7EC] px-3.5 pt-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Back"
                onClick={() => {
                  setActiveDemand(null);
                  setScreen("home");
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[18px] text-[#1C1C1C] shadow-sm ring-1 ring-zinc-200/80"
              >
                ‹
              </button>
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                autoFocus
                placeholder="Search for atta, dal, coke and more"
                className="w-full rounded-full border-0 bg-white px-4 py-2.5 text-[13px] text-[#1C1C1C] shadow-sm outline-none ring-1 ring-zinc-200/80 placeholder:text-[#7E8794] focus:ring-[#0C831F]/40"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3.5 pb-20 pt-4">
            {!q && (
              <>
                <section>
                  <h2 className="text-[18px] font-bold leading-snug text-[#1C1C1C]">
                    ✦ Aaspaas · Around you right now — Sector 47
                  </h2>
                  <p className="mb-3 mt-1 text-[12px] text-[#7E8794]">
                    AI-picked from live neighbourhood demand
                  </p>
                  <ul className="space-y-2">
                    {demand.map((d) => (
                      <li key={d.id}>
                        <button
                          type="button"
                          onClick={() => openDemand(d)}
                          className="w-full rounded-2xl bg-white px-3 py-3 text-left shadow-sm"
                        >
                          <p className="text-[13px] font-semibold text-[#1C1C1C]">
                            {d.category} · {d.orders} orders {d.window}
                          </p>
                          <p className="mt-0.5 text-[11px] text-[#0C831F]">
                            New for you — you haven&apos;t tried this category
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-7">
                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="text-[20px] font-bold text-[#1C1C1C]">
                      Recent searches
                    </h2>
                    <button
                      type="button"
                      onClick={() => setRecents([])}
                      className="text-[13px] font-semibold text-[#0C831F]"
                    >
                      clear
                    </button>
                  </div>
                  {recents.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {recents.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => onQueryChange(term)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-[12px] text-[#1C1C1C]"
                        >
                          <span className="text-[#7E8794]" aria-hidden>
                            ⌕
                          </span>
                          {term}
                        </button>
                      ))}
                    </div>
                  )}
                </section>

                <section className="mt-7">
                  <h2 className="mb-3 text-[20px] font-bold text-[#1C1C1C]">
                    Top picks for you
                  </h2>
                  <div className="-mx-3.5 flex gap-3 overflow-x-auto px-3.5 pb-1">
                    {TOP_PICKS.map((p) => (
                      <ProductCard
                        key={p.name}
                        product={p}
                        onAdd={() => addToCart(p, false)}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}

            {q && matches.length > 0 && (
              <ul className="space-y-1">
                {matches.map((p) => (
                  <li key={p.name}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left hover:bg-white/60"
                    >
                      <EmojiTile
                        emoji={p.emoji}
                        tint={TINT[p.category] ?? "#F5F5F5"}
                        size={28}
                        className="h-10 w-10 shrink-0"
                      />
                      <span className="text-[14px]">
                        <HighlightMatch text={p.name} query={q} />
                      </span>
                    </button>
                  </li>
                ))}
                {showIceHint && (
                  <li>
                    <button
                      type="button"
                      onClick={() => openDemand(iceDemand)}
                      className="mt-1 flex w-full items-center gap-3 rounded-xl border border-[#0C831F]/25 bg-[#EAF7EE] px-3 py-2.5 text-left"
                    >
                      <EmojiTile
                        emoji="🍦"
                        tint="#E3F2FD"
                        size={28}
                        className="h-10 w-10 shrink-0"
                      />
                      <span className="text-[13px] font-semibold text-[#0C831F]">
                        Ice cream · 214 ordered near you tonight · new for you
                      </span>
                    </button>
                  </li>
                )}
              </ul>
            )}

            {q && matches.length === 0 && (
              <>
                {showIceHint && (
                  <button
                    type="button"
                    onClick={() => openDemand(iceDemand)}
                    className="mb-3 flex w-full items-center gap-3 rounded-xl border border-[#0C831F]/25 bg-[#EAF7EE] px-3 py-2.5 text-left"
                  >
                    <EmojiTile
                      emoji="🍦"
                      tint="#E3F2FD"
                      size={28}
                      className="h-10 w-10 shrink-0"
                    />
                    <span className="text-[13px] font-semibold text-[#0C831F]">
                      Ice cream · 214 ordered near you tonight · new for you
                    </span>
                  </button>
                )}

                {netLoading && (
                  <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-4 py-8 text-center">
                    <p className="text-[13px] text-[#7E8794]">
                      ✦ Finding alternatives…
                    </p>
                  </div>
                )}

                {!netLoading && netResult && (
                  <div className="space-y-3">
                    {(() => {
                      const failed =
                        netResult.error ||
                        netResult.confidence === "low" ||
                        !netResult.substitutes?.length;
                      const subs = (netResult.substitutes ?? [])
                        .map((s) => {
                          const product = catalog.find((p) => p.name === s.name);
                          return product ? { product, why: s.why } : null;
                        })
                        .filter(Boolean) as Array<{
                        product: CatalogItem;
                        why: string;
                      }>;
                      const showCards =
                        !failed &&
                        netResult.confidence === "high" &&
                        subs.length > 0;

                      return (
                        <>
                          {showCards ? (
                            <>
                              <h2 className="text-[16px] font-bold text-[#1C1C1C]">
                                ✦ Closest match we found
                              </h2>
                              <div className="-mx-3.5 flex gap-3 overflow-x-auto px-3.5 pb-1">
                                {subs.map(({ product, why }) => (
                                  <ProductCard
                                    key={product.name}
                                    product={product}
                                    why={why}
                                    onAdd={() => addToCart(product, false)}
                                  />
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="rounded-2xl bg-white px-4 py-5 text-center shadow-sm">
                              <p className="text-[13px] leading-snug text-[#7E8794]">
                                We couldn&apos;t find a good match — we&apos;ve
                                logged this for our catalogue team
                              </p>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              console.log("Notify me when we stock it:", query.trim())
                            }
                            className="w-full rounded-xl border border-[#0C831F] bg-white py-2.5 text-[13px] font-semibold text-[#0C831F]"
                          >
                            Notify me when we stock it
                          </button>

                          {!netResult.error && (
                            <details className="rounded-xl bg-white px-3 py-2 text-[12px] text-[#7E8794] shadow-sm">
                              <summary className="cursor-pointer font-medium text-[#1C1C1C]">
                                How this worked
                              </summary>
                              <div className="mt-2 space-y-1 leading-snug">
                                <p>
                                  Intent: {netResult.intent || "—"}
                                </p>
                                <p>
                                  Catalog items searched:{" "}
                                  {netResult.catalogSize ?? catalog.length}
                                </p>
                                <p>
                                  Confidence: {netResult.confidence ?? "low"}
                                </p>
                              </div>
                            </details>
                          )}
                        </>
                      );
                    })()}
                  </div>
                )}
              </>
            )}
          </div>

          {cartCount > 0 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setActiveDemand(null);
                  setScreen("cart");
                }}
                className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#1C1C1C] px-5 py-2.5 text-[13px] font-medium text-white shadow-lg"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F8CB46] text-[11px] font-bold text-[#1C1C1C]">
                  {cartCount}
                </span>
                View cart
              </button>
            </div>
          )}

          {activeDemand && (
            <BottomSheet
              demand={activeDemand}
              products={productsFor(activeDemand)}
              onClose={() => setActiveDemand(null)}
              onAdd={(p) => addToCart(p, true)}
            />
          )}
        </>
      )}

      {/* —— CART —— */}
      {screen === "cart" && (
        <>
          <Header />
          <div className="flex items-center gap-2 border-b border-zinc-100 bg-white px-3.5 py-3">
            <button
              type="button"
              aria-label="Back"
              onClick={() => setScreen(cartCount ? "search" : "home")}
              className="text-[20px] leading-none text-[#1C1C1C]"
            >
              ‹
            </button>
            <h2 className="text-[16px] font-bold text-[#1C1C1C]">Cart</h2>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-4">
            {cart.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-[#7E8794]">
                Your cart is empty
              </p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl bg-white px-3 py-3 shadow-sm"
                  >
                    <div>
                      <p className="text-[13px] font-semibold text-[#1C1C1C]">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[#7E8794]">
                        {item.category}
                        {item.viaAaspaas ? " · via Aaspaas" : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-medium text-[#1C1C1C]">
                        ×{item.qty}
                      </p>
                      <p className="text-[13px] font-bold text-[#1C1C1C]">
                        ₹{item.price * item.qty}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cart.length > 0 && (
            <div className="shrink-0 border-t border-zinc-100 bg-white px-3.5 py-3">
              <div className="mb-2 flex justify-between text-[14px] font-semibold">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <button
                type="button"
                onClick={placeOrder}
                className="w-full rounded-xl bg-[#0C831F] py-3 text-[14px] font-bold text-white"
              >
                Place order
              </button>
            </div>
          )}
          <BottomNav
            active="cart"
            cartCount={cartCount}
            onHome={() => setScreen("home")}
            onCart={() => setScreen("cart")}
          />
        </>
      )}

      {/* —— ORDER PLACED —— */}
      {screen === "order" && (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0C831F] text-3xl text-white">
            ✓
          </div>
          <h2 className="text-[18px] font-bold text-[#1C1C1C]">
            Order placed · arriving in 13 minutes
          </h2>
          {orderDiscovery && (
            <p className="mt-4 rounded-2xl bg-[#F4F9E0] px-4 py-3 text-[13px] font-medium leading-snug text-[#4A6B10]">
              🎉 First time ordering from {orderDiscovery} — discovered via
              Aaspaas
            </p>
          )}
          <button
            type="button"
            onClick={startOver}
            className="mt-8 rounded-xl border border-zinc-300 bg-white px-6 py-2.5 text-[13px] font-semibold text-[#1C1C1C]"
          >
            Start over
          </button>
        </div>
      )}

      {toast && (
        <div className="absolute bottom-24 left-1/2 z-50 w-[85%] -translate-x-1/2 rounded-xl bg-[#1C1C1C] px-4 py-2.5 text-center text-[12px] font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
