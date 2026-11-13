import type { StepItem } from "@/types/case";

interface Props {
  items: StepItem[];
}

export default function StepsTimeline({ items }: Props) {
  return (
    <ol className="border-l-2 border-[#d9d4ee]">
      {items.map((item, i) => (
        <li key={i} className={`relative pl-7 ${i < items.length - 1 ? "pb-7" : ""}`}>
          <span className="absolute -left-[7px] top-[6px] size-3 rounded-full bg-[#b0aaf2]" aria-hidden="true" />
          <h3 className="font-manrope text-[1rem] font-semibold text-[#171717]">{item.title}</h3>
          <p className="mt-1 font-manrope text-[0.9rem] leading-relaxed text-[#5e5c80]">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
