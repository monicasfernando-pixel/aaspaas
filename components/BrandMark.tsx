/** ✦ आस-paas wordmark — sparkle + Devanagari "आस" + Latin "paas". */
export default function BrandMark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-baseline text-[1.15em] font-bold text-[#0C831F] ${className}`}
    >
      <span aria-hidden className="mr-1.5">
        ✦
      </span>
      <span className="relative top-px">आस</span>
      <span className="mx-px text-[0.85em] font-bold opacity-55">-</span>
      <span>paas</span>
    </span>
  );
}
