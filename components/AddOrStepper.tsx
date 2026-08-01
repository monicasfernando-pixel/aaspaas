type Props = {
  qty: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
  /** Match host button footprint */
  variant?: "card" | "sheet" | "row" | "cart";
  className?: string;
};

const SHELL: Record<NonNullable<Props["variant"]>, string> = {
  card: "h-[26px] min-w-[72px] rounded-lg text-[12px]",
  sheet: "mt-1 h-[28px] w-full rounded-md text-[11px]",
  row: "h-[28px] min-w-[72px] rounded-lg text-[12px]",
  cart: "h-[28px] min-w-[78px] rounded-lg text-[13px]",
};

/** Outlined ADD ↔ filled green − qty + stepper, same footprint. */
export default function AddOrStepper({
  qty,
  onAdd,
  onInc,
  onDec,
  variant = "card",
  className = "",
}: Props) {
  const shell = SHELL[variant];

  if (qty <= 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={`inline-flex items-center justify-center border-[1.5px] border-[#0C831F] bg-white font-bold uppercase tracking-wide text-[#0C831F] ${shell} ${className}`}
      >
        ADD
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-between bg-[#0C831F] font-bold text-white ${shell} ${className}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={onDec}
        className="flex h-full w-7 items-center justify-center"
      >
        −
      </button>
      <span className="min-w-[1ch] text-center tabular-nums">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={onInc}
        className="flex h-full w-7 items-center justify-center"
      >
        +
      </button>
    </div>
  );
}
