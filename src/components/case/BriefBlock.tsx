import type { Block } from "@/types/case";

type Props = Extract<Block, { type: "brief-context" }>;

export default function BriefBlock({ contextParagraph, numbersBullets, tension, hypothesisIntro, hypothesisBullets }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-3 font-manrope text-[1.1rem] font-semibold text-[#171717]">Contexto</h3>
        <p className="font-manrope text-[0.95rem] leading-relaxed text-[#2d2d2d]">{contextParagraph}</p>

        <p className="mt-5 font-manrope text-[0.95rem] font-semibold text-[#171717]">Los números de partida:</p>
        <ul className="mt-2 flex flex-col gap-2">
          {numbersBullets.map((item, i) => (
            <li key={i} className="relative pl-5 font-manrope text-[0.9rem] leading-relaxed text-[#2d2d2d] before:absolute before:left-0 before:top-[0.65em] before:h-2 before:w-2 before:rounded-full before:bg-[#b0aaf2] before:content-['']">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl border border-[#d9d4ee] bg-white p-5">
          <p className="font-manrope text-[0.9rem] leading-relaxed text-[#2d2d2d]">
            <strong>La tensión: </strong>{tension.replace("La tensión: ", "")}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-7">
        <h3 className="mb-3 font-manrope text-[1.1rem] font-semibold text-[#171717]">Hipótesis</h3>
        <p className="font-manrope text-[0.9rem] leading-relaxed text-[#2d2d2d]">{hypothesisIntro}</p>
        <ul className="mt-3 flex flex-col gap-2">
          {hypothesisBullets.map((item, i) => (
            <li key={i} className="relative pl-5 font-manrope text-[0.9rem] leading-relaxed text-[#2d2d2d] before:absolute before:left-0 before:top-[0.65em] before:h-2 before:w-2 before:rounded-full before:bg-[#b0aaf2] before:content-['']">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
