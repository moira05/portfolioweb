import type { Block } from "@/types/case";

type Props = Extract<Block, { type: "usability-test" }>;

const TAG_COLORS: Record<"g" | "r" | "y", string> = {
  g: "bg-[#3e9b62]",
  r: "bg-[#d64545]",
  y: "bg-[#e0a526]",
};

export default function UsabilityTestBlock({ descriptionParagraphs, participants, results }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-3 font-manrope text-[1.1rem] font-semibold text-[#171717]">Qué se testeó</h3>
        {descriptionParagraphs.map((p, i) => (
          <p key={i} className={`font-manrope text-[0.95rem] leading-relaxed text-[#2d2d2d] ${i > 0 ? "mt-3" : ""}`}>
            {p}
          </p>
        ))}
        <div className="mt-4 flex flex-col gap-3">
          {participants.map((p, i) => (
            <div key={i} className="rounded-2xl bg-white px-5 py-4">
              <strong className="block font-manrope text-[0.9rem] font-semibold text-[#171717]">{p.role}</strong>
              <span className="font-manrope text-[0.85rem] text-[#5e5c80]">{p.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-manrope text-[1.1rem] font-semibold text-[#171717]">Resultado</h3>
        <div className="flex flex-col gap-3">
          {results.map((r, i) => (
            <div key={i} className="rounded-2xl bg-white p-5">
              <h4 className="mb-2 flex items-center gap-2.5 font-manrope text-[0.95rem] font-semibold text-[#171717]">
                <span className={`h-3 w-3 flex-none rounded-full ${TAG_COLORS[r.tag]}`} />
                {r.label}
              </h4>
              <p className="font-manrope text-[0.9rem] leading-relaxed text-[#2d2d2d]">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
