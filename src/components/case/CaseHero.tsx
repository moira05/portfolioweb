import type { MetaField } from "@/types/case";

interface Props {
  title: string;
  titleEm: string;
  lede: string;
  meta: MetaField[];
}

export default function CaseHero({ title, titleEm, lede, meta }: Props) {
  return (
    <header className="pb-10 pt-12 md:pt-16">
      <span className="mb-5 inline-block rounded-full border border-[#d9d4ee] bg-white px-4 py-1 font-manrope text-[0.75rem] font-semibold text-[#171717]">
        Case study
      </span>

      <h1 className="mb-5 font-vollkorn text-[2.2rem] font-semibold leading-[1.05] tracking-tight text-[#171717] md:text-[3.5rem]">
        {title} <em className="italic">{titleEm}</em>
      </h1>

      <p className="mb-10 font-manrope text-[1rem] leading-relaxed text-[#5e5c80] md:text-[1.2rem]">
        {lede}
      </p>

      <dl className="grid grid-cols-1 gap-x-8 gap-y-5 border-b border-t border-[#d9d4ee] py-6 sm:grid-cols-2 md:grid-cols-3">
        {meta.map(({ label, value }) => (
          <div key={label}>
            <dt className="mb-0.5 font-manrope text-[0.8rem] text-[#5e5c80]">{label}</dt>
            <dd className="font-manrope text-[0.95rem] font-medium text-[#171717]">{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
