"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Block } from "@/types/case";
import styles from "./Carousel.module.css";

type Props = Extract<Block, { type: "carousel" }>;

export default function CarouselBlock({ slides }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const pending = useRef<number | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const els = Array.from(track.children) as HTMLElement[];
      const clamped = Math.max(0, Math.min(i, els.length - 1));
      const target = els[clamped];
      if (!target) return;
      pending.current = clamped;
      clearTimeout(pendingTimer.current);
      pendingTimer.current = setTimeout(() => { pending.current = null; }, 700);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    },
    [],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const els = Array.from(track.children) as HTMLElement[];
        const left = track.scrollLeft + track.offsetLeft;
        let closest = 0, min = Infinity;
        els.forEach((el, i) => {
          const d = Math.abs(el.offsetLeft - left);
          if (d < min) { min = d; closest = i; }
        });
        setIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  const cur = () => pending.current ?? index;

  return (
    <section className={styles.root} aria-roledescription="carrusel" aria-label="Flujo de onboarding">
      <div
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); goTo(cur() + 1); }
          if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(cur() - 1); }
        }}
      >
        {slides.map((s, i) => (
          <figure
            key={s.src}
            className={styles.slide}
            style={{ "--ratio": s.width / s.height } as React.CSSProperties}
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${slides.length}`}
          >
            <div className={styles.frame}>
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes="(max-width: 640px) 80vw, 800px"
                className={styles.img}
                priority={i < 2}
              />
            </div>
            <figcaption className={styles.caption}>
              <span className={styles.num}>{i + 1}</span>
              <span className={styles.captionText}>
                <strong>{s.title}</strong>
                <span>{s.description}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.dots} aria-hidden="true">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              className={i === index ? styles.dotActive : styles.dot}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className={styles.buttons}>
          <span className={styles.counter} aria-live="polite">{index + 1} / {slides.length}</span>
          <button type="button" className={styles.arrow} onClick={() => goTo(cur() - 1)} disabled={index === 0} aria-label="Pantalla anterior">←</button>
          <button type="button" className={styles.arrow} onClick={() => goTo(cur() + 1)} disabled={index === slides.length - 1} aria-label="Pantalla siguiente">→</button>
        </div>
      </div>
    </section>
  );
}
