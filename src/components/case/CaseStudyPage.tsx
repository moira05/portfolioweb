import type { CaseStudy } from "@/types/case";
import CaseHero from "./CaseHero";
import CaseSection from "./CaseSection";
import BlockRenderer from "./BlockRenderer";
import CaseNav from "./CaseNav";

interface Props {
  data: CaseStudy;
}

export default function CaseStudyPage({ data }: Props) {
  return (
    <div className="min-h-screen bg-[#eeedf5]">
      <CaseNav navTitle={data.navTitle} />

      <div className="mx-auto max-w-[880px] px-6 pb-24 md:px-10">
        {/* Hero */}
        <CaseHero
          title={data.title}
          titleEm={data.titleEm}
          lede={data.lede}
          meta={data.meta}
        />

        {/* Sections */}
        {data.sections.map((section) => (
          <CaseSection key={section.heading} heading={section.heading} headingAccent={section.headingAccent} eyebrow={section.eyebrow}>
            {section.blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </CaseSection>
        ))}

        {/* Confidentiality note */}
        <p className="mt-16 border-t border-[#d9d4ee] pt-5 font-manrope text-[0.8rem] text-[#5e5c80]">
          {data.note}
        </p>
      </div>
    </div>
  );
}
