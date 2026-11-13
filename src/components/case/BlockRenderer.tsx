import type { Block } from "@/types/case";
import FlowComparison from "./FlowComparison";
import StepsTimeline from "./StepsTimeline";
import FactsGrid from "./FactsGrid";
import GoalsGrid from "./GoalsGrid";
import ToolsGrid from "./ToolsGrid";
import BenchmarkTable from "./BenchmarkTable";
import DiscoveryBlock from "./DiscoveryBlock";
import BriefBlock from "./BriefBlock";
import UsabilityTestBlock from "./UsabilityTestBlock";
import VersionsBlock from "./VersionsBlock";
import DesignPrinciplesBlock from "./DesignPrinciplesBlock";
import CarouselBlock from "./CarouselBlock";
import MetricsGridBlock from "./MetricsGridBlock";

interface Props {
  block: Block;
}

export default function BlockRenderer({ block }: Props) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-manrope text-[0.95rem] leading-relaxed text-[#2d2d2d] md:text-[1rem]">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="flex flex-col gap-1.5 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="font-manrope text-[0.95rem] leading-relaxed text-[#2d2d2d] md:text-[1rem]">
              {item}
            </li>
          ))}
        </ul>
      );

    case "flow":
      return <FlowComparison before={block.before} after={block.after} />;

    case "steps":
      return <StepsTimeline items={block.items} />;

    case "facts":
      return <FactsGrid rows={block.rows} />;

    case "goals":
      return <GoalsGrid items={block.items} />;

    case "tools":
      return <ToolsGrid items={block.items} />;

    case "benchmark":
      return (
        <BenchmarkTable
          cols={block.cols}
          highlightCol={block.highlightCol}
          rows={block.rows}
        />
      );

    case "blockquote":
      return (
        <blockquote className="border-l-[3px] border-[#b0aaf2] pl-5 font-manrope text-[0.95rem] italic leading-relaxed text-[#5e5c80] md:text-[1rem]">
          {block.text}
        </blockquote>
      );

    case "discovery":
      return <DiscoveryBlock {...block} />;

    case "brief-context":
      return <BriefBlock {...block} />;

    case "usability-test":
      return <UsabilityTestBlock {...block} />;

    case "versions":
      return <VersionsBlock {...block} />;

    case "design-principles":
      return <DesignPrinciplesBlock {...block} />;

    case "carousel":
      return <CarouselBlock {...block} />;

    case "metrics-grid":
      return <MetricsGridBlock {...block} />;
  }
}
