import BrandMark from "@/components/BrandMark";
import PhoneSim from "@/components/PhoneSim";

const BULLETS = [
  {
    icon: "◎",
    text: "Empty bar — live demand from categories you've never bought",
  },
  {
    icon: "✎",
    text: "Typing — one proof line beside your search",
  },
  {
    icon: "⌀",
    text: "No results — the miss gets caught, answered and logged",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F0EC] px-5 py-10 sm:px-8">
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-12">
        {/* Left — pitch */}
        <section className="w-full max-w-md lg:w-[45%] lg:max-w-none lg:shrink-0">
          <h1 className="text-[48px] leading-none tracking-tight sm:text-[56px]">
            <BrandMark />
          </h1>
          <p className="mt-4 text-[17px] font-medium leading-snug text-[#1C1C1C]/85">
            Your search bar knows what your neighbourhood is buying.
          </p>
          <ul className="mt-8 space-y-4">
            {BULLETS.map((b) => (
              <li key={b.text} className="flex gap-3 text-[14px] leading-snug text-[#3A3A3A]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-[12px] font-semibold text-[#0C831F] shadow-sm ring-1 ring-zinc-200/80"
                  aria-hidden
                >
                  {b.icon}
                </span>
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[12px] leading-snug text-zinc-500">
            A discovery feature for Blinkit. Simulation, with live AI on the
            failed-search flow.
          </p>
        </section>

        {/* Right — phone */}
        <section className="flex w-full flex-col items-center gap-3 lg:w-[55%]">
          <div className="relative h-[844px] w-[390px] max-w-full overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
            <PhoneSim />
          </div>
          <p className="max-w-[390px] text-center text-[12px] leading-snug text-zinc-500">
            Keyboard shown to reflect real conditions — only the top-ranked
            demand rows are visible above the fold.
          </p>
        </section>
      </div>
    </main>
  );
}
