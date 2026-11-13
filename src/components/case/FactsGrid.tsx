interface Props {
  rows: { label: string; value: string }[];
}

export default function FactsGrid({ rows }: Props) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#d9d4ee] bg-white">
      {rows.map(({ label, value }, i) => (
        <div
          key={i}
          className={`flex items-center justify-between gap-4 px-5 py-4 ${i > 0 ? "border-t border-[#d9d4ee]" : ""}`}
        >
          <span className="font-manrope text-[0.9rem] text-[#5e5c80]">{label}</span>
          <span className="font-manrope text-[0.9rem] font-semibold whitespace-nowrap text-[#171717]">{value}</span>
        </div>
      ))}
    </div>
  );
}
