export interface ExpStat {
  value: string;
  label: string;
}

export interface ExpCaseLink {
  label: string;
  href: string;
}

export interface ExperienceItem {
  id: string;
  dates: string;
  company: string;
  companyAccent?: boolean;
  subtitle: string;
  role: string;
  description: string;
  stats: [ExpStat, ExpStat, ExpStat];
  caseLinks?: ExpCaseLink[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "itti",
    dates: "oct 2025 – nov 2026",
    company: "ITTI",
    companyAccent: true,
    subtitle: "Asunción, Paraguay · ERP BIMS",
    role: "Senior Product Designer",
    description:
      "Diseñé la experiencia de BIMS, un ERP de gestión para el mercado paraguayo: ventas, stock, finanzas y facturación electrónica. Combiné UX design, UX writing e investigación, y participé en la definición de producto con PM y analistas.",
    stats: [
      { value: "ERP",         label: "Ventas, stock y finanzas" },
      { value: "Onboarding",  label: "Alta de empresa" },
      { value: "IA",          label: "Prototipos en HTML y skills" },
    ],
    caseLinks: [{ label: "Ver caso →", href: "/proyectos/onboarding" }],
  },
  {
    id: "tiendanube",
    dates: "ene 2024 – oct 2025",
    company: "Tiendanube",
    subtitle: "Pago Nube · Remoto",
    role: "Senior Product Designer",
    description:
      "Integré el equipo de Pago Nube, el medio de pago exclusivo de Tiendanube. Lideré el diseño end-to-end de iniciativas como agenda de liquidaciones, contracargos, prueba de vida, retiro de dinero en 1 día y bloqueo por fraude.",
    stats: [
      { value: "6",          label: "Iniciativas end-to-end" },
      { value: "Research",   label: "Entrevistas y tests" },
      { value: "Amplitude",  label: "Métricas y CSAT" },
    ],
    caseLinks: [
      { label: "Contracargos →", href: "/proyectos/contracargos" },
    ],
  },
  {
    id: "uala",
    dates: "abr 2022 – ene 2024",
    company: "Ualá",
    subtitle: "Argentina y México",
    role: "Product Designer Coordinator",
    description:
      "Lideré un equipo de 4 Product Designers y su career path. Definí la metodología de diseño, armé el espacio de Design Ops y bajé los OKRs del equipo a objetivos individuales. Antes, fui responsable de Cash in/out y Transferencias de Argentina y México.",
    stats: [
      { value: "4",           label: "Designers a cargo" },
      { value: "Design Ops",  label: "Documentación y toolkit" },
      { value: "OKRs",        label: "Del equipo al individuo" },
    ],
    caseLinks: [
      { label: "Transferencias →", href: "/proyectos/transferencias" },
    ],
  },
  {
    id: "fpay",
    dates: "jul 2021 – mar 2022",
    company: "Fpay",
    subtitle: "Fintech",
    role: "Ssr. Product Designer",
    description:
      "Diseño de backoffice: research, wireframes, prototipos y QA de diseño. Definí la guía de estilos y el UX writing.",
    stats: [
      { value: "Backoffice",       label: "Fintech" },
      { value: "UX writing",       label: "Voz y tono" },
      { value: "Guía de estilos",  label: "Definida desde cero" },
    ],
  },
  {
    id: "veritran",
    dates: "nov 2019 – jun 2021",
    company: "Veritran",
    subtitle: "Productos financieros",
    role: "Product Designer",
    description:
      "Research, user flows, wireframes y prototipos funcionales para productos financieros.",
    stats: [
      { value: "Research",    label: "Benchmarking y entrevistas" },
      { value: "Flujos",      label: "User flows" },
      { value: "Prototipos",  label: "Funcionales" },
    ],
  },
];
