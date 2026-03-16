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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
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

  const handleClick = (sectionId: string | null) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (!sectionId) return;
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
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
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menú"
        >
          <span className={`block h-[2px] w-6 bg-[#131313] transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 bg-[#131313] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-[#131313] transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[77px] left-0 w-full bg-white border-b border-[#4b5563] px-6 py-6 flex flex-col gap-6">
          {navLinks.map(({ label, href, arrowRotation, external, sectionId }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={handleClick(sectionId)}
              className="group flex items-center gap-1 font-manrope text-[18px] font-normal text-[#131313] hover:opacity-60 transition-opacity"
            >
              {label}
              <ArrowIcon className={`size-[18px] ${arrowRotation}`} />
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
