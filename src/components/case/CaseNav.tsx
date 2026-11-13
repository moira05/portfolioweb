import Link from "next/link";

interface Props {
  navTitle: string;
}

export default function CaseNav({ navTitle }: Props) {
  return (
    <nav
      className="sticky top-0 z-10 border-b border-[#d9d4ee] bg-white"
      aria-label="Navegación del caso"
    >
      <div className="grid h-[52px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
        {/* Left: back link */}
        <Link
          href="/#proyectos"
          className="flex items-center gap-1.5 rounded font-manrope text-[0.875rem] text-[#5e5c80] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5e5c80]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M3 8L7 4M3 8l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Volver al portfolio</span>
          <span className="sm:hidden">Volver</span>
        </Link>

        {/* Center: case name */}
        <span className="font-manrope text-[0.875rem] text-[#5e5c80]">
          {navTitle} · Case study
        </span>

        {/* Right: identity (desktop only) */}
        <span className="hidden text-right font-manrope text-[0.875rem] text-[#5e5c80] md:block">
          Moira Andreoli · Product Designer
        </span>
      </div>
    </nav>
  );
}
