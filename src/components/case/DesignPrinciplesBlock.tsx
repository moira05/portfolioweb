import type { Block } from "@/types/case";

type Props = Extract<Block, { type: "design-principles" }>;

export default function DesignPrinciplesBlock({ lead, rule, principles, imageSrc, imageAlt, imageWidth, imageHeight }: Props) {
  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
      <div>
        <p className="font-manrope text-[1rem] leading-relaxed text-[#2d2d2d]">{lead}</p>
        <p className="mt-5 font-manrope text-[1.05rem] font-semibold leading-snug text-[#171717]">{rule}</p>
        <div className="mt-5 flex flex-col gap-5">
          {principles.map((p, i) => (
            <div key={i} className={`pb-5 ${i < principles.length - 1 ? "border-b border-[#d9d4ee]" : ""}`}>
              <h4 className="mb-1 font-manrope text-[0.95rem] font-semibold text-[#171717]">{p.title}</h4>
              <p className="font-manrope text-[0.875rem] leading-relaxed text-[#5e5c80]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden rounded-2xl"
        style={{ boxShadow: "0 20px 50px rgba(20,20,43,0.18)" }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          className="w-full"
          style={{ height: "auto" }}
        />
      </div>
    </div>
  );
}
