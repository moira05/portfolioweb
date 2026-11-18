"use client";

import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import Container from "./Container";
import { EXPERIENCE } from "@/data/experience";
import styles from "./SectionTitle.module.css";
import expStyles from "./Experiencia.module.css";

const MAIN_WORDS   = ["11", "años"];
const ACCENT_WORDS = ["en", "tecnología."];

function ExperienciaTitle() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const h2Ref   = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const wrap = wrapRef.current;
    const h2   = h2Ref.current;
    if (!wrap || !h2) return;

    wrap.classList.add(styles.mounted);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wrap.classList.add(styles.revealed);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    const raf = requestAnimationFrame(() => io.observe(h2));
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  let letterIdx = 0;

  return (
    <div ref={wrapRef} className="mb-14">
      <p
        className={`mb-3 font-manrope text-[13px] font-semibold uppercase tracking-[0.1em] ${styles.eyebrow}`}
        style={{ color: "var(--muted)" }}
      >
        Experiencia
      </p>
      <h2
        ref={h2Ref}
        aria-label="11 años en tecnología."
        className="font-manrope"
        style={{
          fontSize: "clamp(42px, 7.4vw, 92px)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 0.9,
          color: "var(--ink)",
        }}
      >
        <span aria-hidden="true">
          {MAIN_WORDS.map((word, wi) => {
            const start = letterIdx;
            letterIdx += word.length;
            return (
              <Fragment key={`m${wi}`}>
                <span className={styles.word}>
                  {word.split("").map((ch, li) => (
                    <span
                      key={li}
                      className={styles.letter}
                      style={{ "--i": start + li } as React.CSSProperties}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {" "}
              </Fragment>
            );
          })}
          {ACCENT_WORDS.map((word, wi) => {
            const start = letterIdx;
            letterIdx += word.length;
            return (
              <Fragment key={`a${wi}`}>
                <span
                  className={styles.word}
                  style={{
                    fontFamily: "var(--font-newsreader), Georgia, serif",
                    fontWeight: 600,
                    color: "var(--accent)",
                  }}
                >
                  {word.split("").map((ch, li) => (
                    <span
                      key={li}
                      className={styles.letter}
                      style={{ "--i": start + li } as React.CSSProperties}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
                {wi < ACCENT_WORDS.length - 1 && " "}
              </Fragment>
            );
          })}
        </span>
      </h2>
    </div>
  );
}

export default function Experiencia() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards  = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const observers = cards.map((card, i) => {
      if (reduce) {
        card.style.opacity = "1";
        card.style.transform = "none";
        return null;
      }

      card.style.opacity = "0";
      card.style.transform = "translateY(16px)";

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.style.transition = `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`;
            card.style.opacity = "1";
            card.style.transform = "none";
            obs.disconnect();
          }
        },
        { threshold: 0.06 },
      );
      obs.observe(card);
      return obs;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  const total = EXPERIENCE.length;

  return (
    <section className="bg-[#eeedf5] py-20">
      <Container>
        <ExperienciaTitle />

        {/* Cards strip */}
        <div className="flex flex-col gap-[2px]">
          {EXPERIENCE.map((exp, i) => {
            const isFirst = i === 0;
            const isLast  = i === total - 1;
            const radius  =
              total === 1 ? "24px"
              : isFirst   ? "24px 24px 0 0"
              : isLast    ? "0 0 24px 24px"
              : "0";
            const bg = i % 2 === 0 ? "#fff" : "var(--bg-soft)";

            return (
              <div
                key={exp.id}
                ref={el => { cardRefs.current[i] = el; }}
                style={{ borderRadius: radius, background: bg, border: "1px solid var(--line)" }}
              >
                <div className={expStyles.cardInner}>

                  {/* Left column */}
                  <div className={expStyles.cardLeft}>
                    <p className="font-manrope mb-[6px]" style={{ fontSize: 14, color: "var(--muted)" }}>
                      {exp.dates}
                    </p>
                    <p
                      className="font-manrope mb-[4px]"
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        lineHeight: 1.1,
                        color: exp.companyAccent ? "var(--accent)" : "var(--ink)",
                      }}
                    >
                      {exp.company}
                    </p>
                    {exp.subtitle && (
                      <p className="font-manrope" style={{ fontSize: 14, color: "var(--muted)" }}>
                        {exp.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Right column */}
                  <div>
                    <p
                      className="font-manrope mb-[10px]"
                      style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1, color: "var(--ink)" }}
                    >
                      {exp.role}
                    </p>
                    <p
                      className="font-manrope mb-5"
                      style={{ fontSize: 18, color: "var(--muted)", maxWidth: "60ch", lineHeight: 1.65 }}
                    >
                      {exp.description}
                    </p>

                    {/* Case links */}
                    {exp.caseLinks && exp.caseLinks.length > 0 && (
                      <div className="flex flex-wrap gap-4 mb-5">
                        {exp.caseLinks.map(link => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="font-manrope font-semibold"
                            style={{ fontSize: 15, color: "var(--accent)", textDecoration: "none" }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className={expStyles.stats}>
                      {exp.stats.map((stat, si) => (
                        <div
                          key={si}
                          style={{ borderLeft: "1px solid var(--line)", paddingLeft: 16 }}
                        >
                          <p
                            className="font-manrope"
                            style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}
                          >
                            {stat.value}
                          </p>
                          <p
                            className="font-manrope mt-[3px]"
                            style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.3 }}
                          >
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Cierre */}
        <p
          className="mt-8 font-manrope"
          style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}
        >
          Antes: UI Designer en Technisys, tutora de Diseño UX/UI Avanzado en Coderhouse, diseño freelance desde 2012 y maquetación web.
        </p>
      </Container>
    </section>
  );
}
