"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

interface NavLink {
  label: string;
  href: string;
  sectionId: string | null;
  external: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Proyectos",    href: "/#proyectos",                   sectionId: "proyectos", external: false },
  { label: "Sobre mí",     href: "/sobre-mi",                     sectionId: null,        external: false },
  { label: "AI",           href: "/ai",                           sectionId: null,        external: false },
  { label: "Pensamientos", href: "https://medium.com/@moirixand", sectionId: null,        external: true  },
];

function ExternalArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H3.5M8.5 1.5V6.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavbarInner() {
  const pathname = usePathname();
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState<string | null>(null);
  const [menuOpen,       setMenuOpen]        = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef  = useRef<HTMLButtonElement>(null);

  /* ── Scroll detection ─────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── IntersectionObserver for active section ──────────────────────────── */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.sectionId).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── Block body scroll when overlay open ─────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── inert on overlay (hides from AT and prevents tab when closed) ────── */
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (menuOpen) {
      el.removeAttribute("inert");
    } else {
      el.setAttribute("inert", "");
    }
  }, [menuOpen]);

  /* ── Focus first link when overlay opens ─────────────────────────────── */
  useEffect(() => {
    if (!menuOpen) return;
    const t = setTimeout(() => {
      overlayRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    }, 60);
    return () => clearTimeout(t);
  }, [menuOpen]);

  /* ── Close on resize to desktop ──────────────────────────────────────── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 760) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Focus trap + Escape (overlay) ───────────────────────────────────── */
  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      setTimeout(() => toggleRef.current?.focus(), 0);
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = Array.from(
      overlayRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  };

  /* ── Active link ──────────────────────────────────────────────────────── */
  const isActive = (link: NavLink) => {
    if (link.external) return false;
    if (link.sectionId !== null) return activeSection === link.sectionId;
    return pathname === link.href;
  };

  /* ── Smooth scroll for same-page anchors (desktop + overlay) ─────────── */
  const makeClickHandler = (link: NavLink, fromOverlay = false) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (fromOverlay) {
        setMenuOpen(false);
        setTimeout(() => toggleRef.current?.focus(), 0);
      }
      if (!link.sectionId) return;
      const el = document.getElementById(link.sectionId);
      if (!el) return; // different page – let Next.js navigate
      e.preventDefault();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    };

  const pillStyle: React.CSSProperties = {
    pointerEvents: "auto",
    borderRadius: 999,
    border: "1px solid var(--line)",
    background: scrolled ? "rgba(255,255,255,.82)" : "rgba(238,237,245,.72)",
    backdropFilter: "saturate(1.4) blur(14px)",
    WebkitBackdropFilter: "saturate(1.4) blur(14px)",
    boxShadow: scrolled ? "0 12px 30px -14px rgba(20,20,43,.25)" : "none",
    transition: "background 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <>
      {/* ── Fixed pill wrapper ───────────────────────────────────────────── */}
      <div
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, pointerEvents: "none" }}
        className="navbar-top-pad"
      >
        <div className="container-layout">
          <nav aria-label="Principal" className="navbar-pill" style={pillStyle}>

            <Logo />

            {/* Desktop links */}
            <ul className="nav-desktop" style={{ listStyle: "none", alignItems: "center", gap: 4 }}>
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={makeClickHandler(link)}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    {...(link.label === "Pensamientos"
                      ? { "aria-label": "Pensamientos (abre Medium en una pestaña nueva)" }
                      : {})}
                    aria-current={isActive(link) ? "page" : undefined}
                    className="nav-link"
                  >
                    {link.label}
                    {link.external && <ExternalArrow />}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              ref={toggleRef}
              className="nav-mobile hamburger-btn"
              style={{
                width: 44, height: 44,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                borderRadius: 999,
              }}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="navbar-overlay"
              onClick={() => setMenuOpen(o => !o)}
            >
              <span
                className="hamburger-line"
                style={{ transform: menuOpen ? "translateY(3.5px) rotate(45deg)" : "none" }}
              />
              <span
                className="hamburger-line"
                style={{ transform: menuOpen ? "translateY(-3.5px) rotate(-45deg)" : "none" }}
              />
            </button>

          </nav>
        </div>
      </div>

      {/* ── Mobile full-screen overlay ───────────────────────────────────── */}
      <div
        id="navbar-overlay"
        ref={overlayRef}
        onKeyDown={handleOverlayKeyDown}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 48,
          background: "var(--bg)",
          paddingTop: 104,
          visibility: menuOpen ? "visible" : "hidden",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          overflowY: "auto",
        }}
      >
        <div className="container-layout">
          {NAV_LINKS.map(link => (
            <div key={link.label} style={{ borderBottom: "1px solid var(--line)" }}>
              <Link
                href={link.href}
                onClick={makeClickHandler(link, true)}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                {...(link.label === "Pensamientos"
                  ? { "aria-label": "Pensamientos (abre Medium en una pestaña nueva)" }
                  : {})}
                aria-current={isActive(link) ? "page" : undefined}
                className="nav-overlay-link"
              >
                {link.label}
                {link.external && (
                  <span style={{ marginLeft: 8, fontWeight: 400, fontSize: "0.65em", verticalAlign: "middle" }}>↗</span>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/proyectos/")) return null;
  return <NavbarInner />;
}
