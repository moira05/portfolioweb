import Image from "next/image";

interface Props {
  before: string;
  after: string;
  icon: string;
}

export default function MetricCover({ before, after, icon }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#eeedf5] px-6">
      {/* Icon top-right, decorative */}
      <div className="absolute right-6 top-6 opacity-20">
        <Image src={icon} alt="" width={65} height={65} className="object-contain" aria-hidden="true" />
      </div>

      {/* Metric */}
      <div className="flex items-baseline gap-3">
        <span className="font-vollkorn text-[2rem] font-normal text-[#5e5c80] line-through decoration-[#b0aaf2] md:text-[2.4rem]">
          {before}
        </span>
        <span className="font-manrope text-[1.2rem] text-[#b0aaf2]">→</span>
        <span className="font-vollkorn text-[3rem] font-normal text-[#171717] md:text-[3.8rem]">
          {after}
        </span>
      </div>
    </div>
  );
}
