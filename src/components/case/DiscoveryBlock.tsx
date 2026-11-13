import type { Block } from "@/types/case";

type Props = Extract<Block, { type: "discovery" }>;

export default function DiscoveryBlock({ countInterviews, countCompanies, caption, quote, findings, takeaway }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.25fr]">
      <div>
        <h3 className="mb-3 font-manrope text-[1.1rem] font-semibold text-[#171717]">Muestra</h3>
        <p className="font-manrope text-[0.95rem] leading-relaxed text-[#2d2d2d]">
          <span className="font-vollkorn text-[1.2em] font-semibold">{countInterviews}</span> entrevistas en profundidad a{" "}
          <span className="font-vollkorn text-[1.2em] font-semibold">{countCompanies}</span> empresas de distintos rubros (bares, belleza, construcción, indumentaria, alimentos), desde recién empezadas hasta 10 años de trayectoria.
        </p>
        <p className="mt-2 font-manrope text-[0.85rem] leading-relaxed text-[#5e5c80]">{caption}</p>
        <blockquote className="mt-5 border-l-[3px] border-[#b0aaf2] pl-5 font-vollkorn text-[1.3rem] italic leading-snug text-[#171717]">
          "{quote}"
        </blockquote>
      </div>

      <div className="rounded-2xl bg-white p-7">
        <h3 className="mb-4 font-manrope text-[1.1rem] font-semibold text-[#171717]">Hallazgos</h3>
        <ol className="flex flex-col gap-3">
          {findings.map((finding, i) => (
            <li key={i} className="grid grid-cols-[36px_1fr] gap-2">
              <span className="mt-0.5 flex h-[30px] w-[30px] flex-none items-center justify-center rounded-full bg-[#1b1b3a] font-manrope text-[0.8rem] font-semibold text-white">
                {i + 1}
              </span>
              <span className="font-manrope text-[0.9rem] leading-relaxed text-[#2d2d2d]">{finding}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-[#d9d4ee] pt-4 font-manrope text-[0.95rem] font-semibold leading-snug text-[#171717]">
          {takeaway}
        </p>
      </div>
    </div>
  );
}
