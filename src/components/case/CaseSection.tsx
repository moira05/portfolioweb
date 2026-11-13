import SectionTitle from "@/components/SectionTitle";

interface Props {
  heading: string;
  headingAccent?: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export default function CaseSection({ heading, headingAccent, eyebrow, children }: Props) {
  return (
    <section className="mt-16">
      <SectionTitle eyebrow={eyebrow} accent={headingAccent}>
        {heading}
      </SectionTitle>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
