import type { ToolItem } from "@/types/case";

interface Props {
  items: ToolItem[];
}

export default function ToolsGrid({ items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={i} className="rounded-[20px] border border-[#d9d4ee] bg-white p-5">
          <h3 className="mb-1 font-manrope text-[0.95rem] font-semibold text-[#171717]">{item.title}</h3>
          <p className="font-manrope text-[0.85rem] leading-relaxed text-[#5e5c80]">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
