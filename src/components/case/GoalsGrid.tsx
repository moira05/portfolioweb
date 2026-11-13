import type { GoalItem } from "@/types/case";

interface Props {
  items: GoalItem[];
}

export default function GoalsGrid({ items }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 rounded-[20px] bg-[#1b1b3a] px-6 py-5 text-white"
        >
          <span className="font-vollkorn text-[2.2rem] font-semibold leading-none tracking-tight">
            {item.n}
          </span>
          <div>
            <h3 className="font-manrope text-[0.95rem] font-semibold">{item.title}</h3>
            <p className="mt-1 font-manrope text-[0.85rem] leading-relaxed opacity-85">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
