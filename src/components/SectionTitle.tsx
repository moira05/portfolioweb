interface Props {
  eyebrow?: string;
  accent?: string;
  children: React.ReactNode;
}

export default function SectionTitle({ eyebrow, accent, children }: Props) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="mb-3 font-manrope text-[18px] font-normal text-[#5e5c80]">
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-[16ch] font-manrope text-[clamp(32px,5.6vw,70px)] font-bold leading-[1.02] tracking-[-0.03em] text-[#14142b]">
        {children}
        {accent && (
          <>
            {" "}
            <span className="font-vollkorn font-medium text-[#8a7de0]">
              {accent}.
            </span>
          </>
        )}
      </h2>
    </div>
  );
}
