import type { FlowBeforePanel, FlowAfterPanel } from "@/types/case";

interface Props {
  before: FlowBeforePanel;
  after: FlowAfterPanel;
}

export default function FlowComparison({ before, after }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Before */}
      <div className="rounded-[20px] border border-[#d9d4ee] bg-white p-6">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h3 className="font-manrope text-[1rem] font-semibold text-[#171717]">{before.title}</h3>
          <span className="font-manrope text-[0.8rem] text-[#5e5c80]">{before.subtitle}</span>
        </div>
        <ol className="flex flex-col gap-2.5">
          {before.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 rounded-[10px] bg-[#fbeae6] px-4 py-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#b3402f] font-manrope text-[0.7rem] font-semibold text-white">
                {i + 1}
              </span>
              <span className="font-manrope text-[0.9rem] leading-snug text-[#171717]">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* After */}
      <div className="rounded-[20px] border border-[#b0aaf2] bg-white p-6 shadow-[0_0_0_3px_#e6e0fa]">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h3 className="font-manrope text-[1rem] font-semibold text-[#171717]">{after.title}</h3>
          <span className="font-manrope text-[0.8rem] text-[#5e5c80]">{after.subtitle}</span>
        </div>
        <div className="flex flex-col gap-2.5">
          {after.items.map((item, i) =>
            item.type === "drop" ? (
              <div key={i} className="rounded-[10px] border-2 border-dashed border-[#b0aaf2] px-4 py-5 text-center font-manrope text-[0.9rem] font-semibold text-[#5b45d6]">
                {item.text}
              </div>
            ) : (
              <div key={i} className="rounded-[10px] bg-[#e6e0fa] px-4 py-3 font-manrope text-[0.9rem] leading-snug text-[#171717]">
                {item.text}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
