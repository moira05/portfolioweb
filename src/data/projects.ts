export type CoverData =
  | { type: "metric"; before: string; after: string; icon: string }
  | { type: "image"; src: string; alt: string; objectPosition?: "top" | "center" | "bottom" }
  | { type: "cycle"; frame: "phone" | "browser"; images: { src: string; alt: string }[] }
  | { type: "split"; before: string; after: string; phone: { src: string; alt: string } }
  | { type: "kycimg"; src: string; alt: string }
  | { type: "stepper"; steps: string[] }
  | { type: "abstract" };

export interface Project {
  slug: string;
  category: string;
  title: string;
  descriptor: string;
  cover: CoverData;
  result: string;
  status: "published" | "coming-soon";
  href?: string;
}

export const PROJECTS: Project[] = [
  // ── Fila 1: grandes ──────────────────────────────────────────────────────────
  {
    slug: "contracargos",
    category: "Fintech · Pagos",
    title: "Contracargos",
    descriptor: "defensa en un paso",
    cover: {
      type: "cycle",
      frame: "phone",
      images: [
        { src: "/projects/contracargos/01.webp", alt: "Pantalla 1" },
        { src: "/projects/contracargos/02.webp", alt: "Pantalla 2" },
        { src: "/projects/contracargos/03.webp", alt: "Pantalla 3" },
      ],
    },
    result: "De un proceso manual con formulario, captura y PDF a cargar el comprobante dentro de la plataforma.",
    status: "published",
  },
  {
    slug: "onboarding",
    category: "ERP · B2B",
    title: "Onboarding",
    descriptor: "alta de empresa",
    cover: {
      type: "cycle",
      frame: "browser",
      images: [
        { src: "/projects/onboarding/01.webp", alt: "Pantalla 1" },
        { src: "/projects/onboarding/02.webp", alt: "Pantalla 2" },
        { src: "/projects/onboarding/03.webp", alt: "Pantalla 3" },
        { src: "/projects/onboarding/04.webp", alt: "Pantalla 4" },
      ],
    },
    result: "De 6 pasos a 3 para darse de alta solo, sin reuniones de implementación.",
    status: "published",
  },
  // ── Fila 2: medianas ─────────────────────────────────────────────────────────
  {
    slug: "transferencias",
    category: "Fintech · Pagos",
    title: "Transferencias",
    descriptor: "feedback inmediato",
    cover: {
      type: "split",
      before: "+1 min",
      after: "4–7 s",
      phone: { src: "/projects/transferencias/screen.webp", alt: "Confirmación de transferencia" },
    },
    result: "De más de un minuto de incertidumbre a una confirmación en segundos.",
    status: "published",
  },
  {
    slug: "estudio-arquitectura",
    category: "Diseño web · IA",
    title: "Estudio de arquitectura",
    descriptor: "web con IA",
    cover: { type: "image", src: "/constructora.png", alt: "Sitio web para estudio de arquitectura" },
    result: "Sitio diseñado y desarrollado con herramientas de IA, listo para publicar.",
    status: "published",
    href: "https://www.afdesarrollos.com.ar/",
  },
  {
    slug: "kyc",
    category: "Producto · UX",
    title: "Prueba de vida",
    descriptor: "próximamente",
    cover: { type: "kycimg", src: "/kyc.png", alt: "KYC Prueba de vida" },
    result: "Menos errores al verificar identidad.",
    status: "coming-soon",
  },
];
