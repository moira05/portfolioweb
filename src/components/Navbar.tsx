"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Proyectos",    href: "#proyectos",                         arrowRotation: "rotate-90",           external: false, sectionId: "proyectos" },
  { label: "Sobre mi",     href: "#lado-a",                            arrowRotation: "rotate-90",           external: false, sectionId: "lado-a"    },
  { label: "Pensamientos", href: "https://medium.com/@moirixand",      arrowRotation: "-rotate-[54.78deg]",  external: true,  sectionId: null        },
  { label: "Contacto",     href: "#contacto",                          arrowRotation: "rotate-90",           external: false, sectionId: "contacto"  },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
    </svg>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleClick = (sectionId: string | null) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (!sectionId) return;
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <nav className="w-full border-b border-[#4b5563] bg-white relative z-50">
        <div className="mx-auto flex h-[77px] max-w-screen-xl items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logomoi.svg" alt="Logo" className="h-10" />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-[68px]">
            {navLinks.map(({ label, href, arrowRotation, external, sectionId }) => (
              <li key={label}>
                <Link
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={handleClick(sectionId)}
                  className="group flex items-center gap-1 font-manrope text-[18px] leading-none font-normal text-[#131313] transition-all hover:opacity-60"
                >
                  {label}
                  <ArrowIcon className={`size-[18px] ${arrowRotation} transition-transform group-hover:translate-x-0.5`} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 cursor-pointer z-[60]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span className={`block h-[2px] w-6 bg-[#131313] transition-all duration-300 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-[2px] w-6 bg-[#131313] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-[2px] w-6 bg-[#131313] transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#eeedf5] flex flex-col transition-all duration-400 ease-in-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionDuration: "350ms" }}
      >
        {/* Close button top-right */}
        <div className="flex justify-end px-6 pt-6 pb-4">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="flex items-center justify-center w-10 h-10 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="#131313" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links — vertically centered */}
        <div className="flex flex-1 flex-col justify-center px-10">
          {navLinks.map(({ label, href, arrowRotation, external, sectionId }, idx) => (
            <div key={label}>
              <Link
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={handleClick(sectionId)}
                className="group flex items-center justify-between py-6 font-manrope text-[2rem] font-normal text-[#131313] transition-opacity hover:opacity-50"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
                  transition: `opacity 350ms ease, transform 350ms ease`,
                  transitionDelay: menuOpen ? `${idx * 80 + 100}ms` : "0ms",
                }}
              >
                {label}
                <ArrowIcon className={`size-[22px] ${arrowRotation}`} />
              </Link>
              {idx < navLinks.length - 1 && (
                <div className="h-px bg-[#4b5563]/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
