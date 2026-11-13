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
    category: "Tiendanube",
    title: "Contracargos",
    descriptor: "defensa en un paso",
    cover: {
      type: "cycle",
      frame: "phone",
      images: [
        { src: "/01-listado.png", alt: "Listado de contracargos" },
        { src: "/02-venta.png", alt: "Detalle de venta" },
        { src: "/03-comprobante.png", alt: "Carga de comprobante" },
      ],
    },
    result: "De un proceso manual con formulario, captura y PDF a cargar el comprobante dentro de la plataforma.",
    status: "published",
  },
  {
    slug: "onboarding",
    category: "ITTI - BIMS",
    title: "Onboarding",
    descriptor: "alta de empresa",
    cover: {
      type: "cycle",
      frame: "browser",
      images: [
        { src: "/onboarding/landing.webp", alt: "Landing de onboarding" },
        { src: "/onboarding/registro.webp", alt: "Paso de registro" },
        { src: "/onboarding/paso-1.webp", alt: "Paso 1" },
        { src: "/onboarding/plan.webp", alt: "Selección de plan" },
      ],
    },
    result: "De 6 pasos a 3 para darse de alta solo, sin reuniones de implementación.",
    status: "published",
  },
  // ── Fila 2: medianas ─────────────────────────────────────────────────────────
  {
    slug: "transferencias",
    category: "Ualá",
    title: "Transferencias",
    descriptor: "feedback inmediato",
    cover: {
      type: "split",
      before: "+1 min",
      after: "4–7 s",
      phone: { src: "/exito.png", alt: "Pantalla de confirmación de transferencia exitosa" },
    },
    result: "De más de un minuto de incertidumbre a una confirmación en segundos.",
    status: "published",
  },
  {
    slug: "kyc",
    category: "Producto · UX",
    title: "Prueba de vida",
    descriptor: "próximamente",
    cover: { type: "kycimg", src: "/kyc.png", alt: "KYC Prueba de vida" },
    result: "Mejoras en el flujo de verificación de identidad para una experiencia más simple y segura.",
    status: "coming-soon",
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
];
