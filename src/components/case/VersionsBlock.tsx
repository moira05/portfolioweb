import type { Block } from "@/types/case";

type Props = Extract<Block, { type: "versions" }>;

export default function VersionsBlock({ versions }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {versions.map((v) => (
        <div key={v.n}>
          <h3 className="mb-0.5 font-manrope text-[1.2rem] font-semibold text-[#171717]">
            <span className="mr-1.5 font-normal text-[#5e5c80]">{v.n}</span>
            {v.title}
          </h3>
          <p className="mb-4 font-manrope text-[0.9rem] text-[#5e5c80]">{v.sub}</p>
          <div className="overflow-hidden rounded-2xl border border-[#d9d4ee] bg-[#f6f6f6]">
            <img
              src={v.src}
              alt={v.alt}
              width={v.width}
              height={v.height}
              loading="lazy"
              className="w-full"
              style={{ height: "auto" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
