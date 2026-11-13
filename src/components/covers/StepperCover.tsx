interface Props {
  steps: string[];
}

export default function StepperCover({ steps }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#eeedf5] px-6">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-1">
          <div className="rounded-[10px] border border-[#b0aaf2] bg-white px-5 py-2 font-manrope text-[0.8rem] font-semibold text-[#171717]">
            {step}
          </div>
          {i < steps.length - 1 && (
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <path d="M6 0v10M2 7l4 5 4-5" stroke="#b0aaf2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
