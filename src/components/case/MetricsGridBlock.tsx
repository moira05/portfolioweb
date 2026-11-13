import type { Block } from "@/types/case";

type Props = Extract<Block, { type: "metrics-grid" }>;

export default function MetricsGridBlock({ main, metrics, measure }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Main metric */}
      <div className="rounded-2xl bg-[#1b1b3a] px-8 py-7 text-white">
        <span className="mb-2 block font-manrope text-[0.7rem] font-semibold uppercase tracking-widest text-[#b9b9d3]">
          {main.label}
        </span>
        <h3 className="mb-5 font-manrope text-[1.1rem] font-semibold leading-snug">{main.title}</h3>
        <div className="flex flex-wrap gap-8">
          {main.goals.map((g, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-manrope text-[0.7rem] font-semibold uppercase tracking-widest text-[#b9b9d3]">{g.label}</span>
              <span className="font-vollkorn text-[2.8rem] font-medium leading-none">{g.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col gap-3 rounded-2xl bg-white px-7 py-6 ${m.fullWidth ? "sm:col-span-2" : ""}`}
          >
            <span className="font-manrope text-[0.7rem] font-semibold uppercase tracking-widest text-[#5e5c80]">
              {m.label}
            </span>
            <h3 className="font-manrope text-[0.95rem] font-semibold text-[#171717]">{m.title}</h3>
            <div className="flex flex-wrap gap-7">
              {m.goals.map((g, j) => (
                <div key={j} className="flex flex-col gap-0.5">
                  <span className="font-manrope text-[0.7rem] font-semibold uppercase tracking-widest text-[#5e5c80]">{g.label}</span>
                  <span className="font-vollkorn text-[2rem] font-medium leading-none text-[#171717]">{g.value}</span>
                </div>
              ))}
            </div>
            {m.note && (
              <p className="font-manrope text-[0.85rem] leading-relaxed text-[#5e5c80]">{m.note}</p>
            )}
          </div>
        ))}
      </div>

      {/* Measure box */}
      <div className="rounded-2xl border border-dashed border-[#b0aaf2] px-7 py-6">
        <h3 className="mb-2 font-manrope text-[0.95rem] font-semibold text-[#171717]">{measure.title}</h3>
        <p className="font-manrope text-[0.9rem] leading-relaxed text-[#5e5c80]">{measure.text}</p>
      </div>
    </div>
  );
}
