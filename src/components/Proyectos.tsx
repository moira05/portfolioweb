"use client";

import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS } from "@/data/projects";
import styles from "./Proyectos.module.css";

const RIBBON_TAGS = [
  "Fintech",
  "ERP · B2B",
  "Food tech",
  "Diseño web con IA",
  "Producto · UX",
  "Pagos",
];

const row1 = PROJECTS.slice(0, 2);
const row2 = PROJECTS.slice(2);

export default function Proyectos() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-card]");
    if (!cards) return;
    const observers: IntersectionObserver[] = [];

    cards.forEach((card, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, i * 70);
            observer.disconnect();
          }
        },
        { threshold: 0.06 },
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section id="proyectos" className="bg-[#eeedf5] pt-14 overflow-hidden">
      {/* Ribbon */}
      <div
        aria-hidden="true"
        className="border-y border-[#dcdae8] bg-white/50 overflow-hidden"
      >
        <div className={styles.ribbonTrack}>
          {[...RIBBON_TAGS, ...RIBBON_TAGS].map((tag, i) => (
            <span
              key={i}
              className="font-manrope text-[15px] text-[#5f5c85] whitespace-nowrap px-7 py-4 after:ml-14 after:text-[#a99cf0] after:content-['✦']"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1180px] px-8 pt-24 pb-[120px]">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-manrope text-[clamp(32px,5.6vw,70px)] font-bold leading-[1.02] tracking-[-0.03em] text-[#14142b]">
            Proyectos
          </h2>
          <span className="shrink-0 font-manrope text-[15px] text-[#5f5c85] pb-[18px]">
            {PROJECTS.length} casos
          </span>
        </div>

        {/* Grid */}
        <div ref={gridRef} className={styles.grid}>
          {row1.map((project, i) => (
            <div
              key={project.slug}
              data-card
              className={styles.bigCard}
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms`,
              }}
            >
              <ProjectCard project={project} large />
            </div>
          ))}

          {row2.map((project, i) => (
            <div
              key={project.slug}
              data-card
              className={styles.smallCard}
              style={{
                opacity: 0,
                transform: "translateY(16px)",
                transition: `opacity 0.5s ease ${(i + 2) * 70}ms, transform 0.5s ease ${(i + 2) * 70}ms`,
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
