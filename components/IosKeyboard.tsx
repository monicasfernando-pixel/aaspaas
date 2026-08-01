const ROW1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const ROW3 = ["Z", "X", "C", "V", "B", "N", "M"];

function Key({
  label,
  wide,
  wider,
  muted,
}: {
  label: string;
  wide?: boolean;
  wider?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex h-full items-center justify-center rounded-[5px] text-[15px] font-normal shadow-[0_1px_0_rgba(0,0,0,0.25)] ${
        muted ? "bg-[#ADB3BC] text-[#1C1C1C]" : "bg-white text-[#1C1C1C]"
      } ${wide ? "flex-[1.4]" : wider ? "flex-[4.2]" : "flex-1"}`}
      aria-hidden
    >
      {label}
    </div>
  );
}

/** Static, non-interactive iOS-style QWERTY graphic for the phone frame. */
export default function IosKeyboard() {
  return (
    <div
      className="pointer-events-none flex h-[40%] w-full shrink-0 flex-col justify-end bg-[#D1D3D9] px-1.5 pb-2 pt-2 select-none"
      aria-hidden
    >
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-[6px]">
        <div className="flex h-[18%] gap-[5px]">
          {ROW1.map((k) => (
            <Key key={k} label={k} />
          ))}
        </div>
        <div className="flex h-[18%] gap-[5px] px-[3%]">
          {ROW2.map((k) => (
            <Key key={k} label={k} />
          ))}
        </div>
        <div className="flex h-[18%] gap-[5px]">
          <Key label="⇧" muted wide />
          {ROW3.map((k) => (
            <Key key={k} label={k} />
          ))}
          <Key label="⌫" muted wide />
        </div>
        <div className="flex h-[18%] gap-[5px]">
          <Key label="123" muted wide />
          <Key label="🌐" muted />
          <Key label="space" wider />
          <Key label="return" muted wide />
        </div>
      </div>
      <div className="mx-auto mt-1.5 h-[4px] w-[34%] rounded-full bg-[#1C1C1C]/35" />
    </div>
  );
}
