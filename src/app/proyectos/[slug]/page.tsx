import { notFound } from "next/navigation";
import type { CaseStudy } from "@/types/case";
import CaseStudyPage from "@/components/case/CaseStudyPage";
import contracargos from "@/content/contracargos";
import transferencias from "@/content/transferencias";
import onboarding from "@/content/onboarding";

const CASES: Record<string, CaseStudy> = {
  contracargos,
  transferencias,
  onboarding,
};

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = CASES[slug];
  if (!data) return {};
  return {
    title: `${data.title} ${data.titleEm} — Moira`,
    description: data.lede,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = CASES[slug];
  if (!data) notFound();
  return <CaseStudyPage data={data} />;
}
