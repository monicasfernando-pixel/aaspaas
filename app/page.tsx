import PhoneSim from "@/components/PhoneSim";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#F0F0EC] px-4 py-10">
      <p className="max-w-md text-center text-[15px] font-medium leading-snug text-zinc-800">
        Your search bar knows what your neighbourhood is buying.
      </p>

      <div className="relative h-[926px] w-[428px] overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        <PhoneSim />
      </div>

      <p className="max-w-[428px] text-center text-[12px] leading-snug text-zinc-500">
        Keyboard shown to reflect real conditions — only the top-ranked demand
        rows are visible above the fold.
      </p>
    </main>
  );
}
