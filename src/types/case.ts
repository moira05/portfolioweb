export interface MetaField {
  label: string;
  value: string;
}

export interface FlowBeforePanel {
  title: string;
  subtitle: string;
  items: string[];
}

export interface FlowAfterItem {
  text: string;
  type: "step" | "drop";
}

export interface FlowAfterPanel {
  title: string;
  subtitle: string;
  items: FlowAfterItem[];
}

export interface StepItem {
  title: string;
  text: string;
}

export interface GoalItem {
  n: string;
  title: string;
  text: string;
}

export interface ToolItem {
  title: string;
  text: string;
}

export interface BenchmarkRow {
  label: string;
  values: ("y" | "n")[];
  total: string;
}

export interface TestParticipant {
  role: string;
  detail: string;
}

export interface TestResult {
  tag: "g" | "r" | "y";
  label: string;
  text: string;
}

export interface VersionItem {
  n: string;
  title: string;
  sub: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PrincipleItem {
  title: string;
  text: string;
}

export interface CarouselSlide {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  description: string;
}

export interface MetricGoal {
  label: string;
  value: string;
}

export interface MetricCard {
  label: string;
  title: string;
  goals: MetricGoal[];
  note?: string;
  fullWidth?: boolean;
}

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "flow"; before: FlowBeforePanel; after: FlowAfterPanel }
  | { type: "steps"; items: StepItem[] }
  | { type: "facts"; rows: { label: string; value: string }[] }
  | { type: "goals"; items: GoalItem[] }
  | { type: "tools"; items: ToolItem[] }
  | { type: "benchmark"; cols: string[]; highlightCol: number; rows: BenchmarkRow[] }
  | { type: "blockquote"; text: string }
  | { type: "discovery"; countInterviews: number; countCompanies: number; caption: string; quote: string; findings: string[]; takeaway: string }
  | { type: "brief-context"; contextParagraph: string; numbersBullets: string[]; tension: string; hypothesisIntro: string; hypothesisBullets: string[] }
  | { type: "usability-test"; descriptionParagraphs: string[]; participants: TestParticipant[]; results: TestResult[] }
  | { type: "versions"; versions: VersionItem[] }
  | { type: "design-principles"; lead: string; rule: string; principles: PrincipleItem[]; imageSrc?: string; imageAlt?: string; imageWidth?: number; imageHeight?: number }
  | { type: "carousel"; slides: CarouselSlide[] }
  | { type: "metrics-grid"; main: { label: string; title: string; goals: MetricGoal[] }; metrics: MetricCard[]; measure: { title: string; text: string } };

export interface CaseSection {
  heading: string;
  headingAccent?: string;
  eyebrow?: string;
  blocks: Block[];
}

export interface CaseStudy {
  slug: string;
  navTitle: string;
  title: string;
  titleEm: string;
  lede: string;
  meta: MetaField[];
  sections: CaseSection[];
  note: string;
}
