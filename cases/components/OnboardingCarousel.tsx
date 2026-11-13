"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./OnboardingCarousel.module.css";

type Slide = {
  src: string;
  w: number;
  h: number;
  title: string;
  text: string;
};

// Editá los textos: cada uno cuenta la decisión de esa pantalla.
const SLIDES: Slide[] = [
  { src: "/onboarding/landing.webp", w: 1025, h: 577, title: "Landing", text: "Entrada al flujo: la promesa y el botón para empezar gratis." },
  { src: "/onboarding/registro.webp", w: 1600, h: 1226, title: "Registro", text: "Crear la cuenta y probar 30 días gratis." },
  { src: "/onboarding/verificar-correo.webp", w: 1600, h: 900, title: "Verificar correo", text: "Pantalla de espera con reenvío y opción de corregir el correo." },
  { src: "/onboarding/email-bienvenida.webp", w: 651, h: 1146, title: "Email de bienvenida", text: "Un solo llamado a la acción y qué se puede hacer con la cuenta activa." },
  { src: "/onboarding/paso-1.webp", w: 1600, h: 900, title: "Paso 1 de 3", text: "Cómo administra hoy su empresa, para personalizar el plan." },
  { src: "/onboarding/paso-2.webp", w: 1600, h: 900, title: "Paso 2 de 3", text: "Validación de la empresa con el RUC, con ayuda para encontrarlo." },
  { src: "/onboarding/paso-3.webp", w: 1366, h: 839, title: "Paso 3 de 3", text: "Rubro, módulos de interés y facturación electrónica." },
  { src: "/onboarding/plan.webp", w: 1366, h: 989, title: "Plan elegido", text: "Qué incluye el plan y aviso de que no hay cargos durante la prueba." },
  { src: "/onboarding/inicio.webp", w: 1600, h: 900, title: "Inicio", text: "Lista de configuraciones pendientes para empezar a vender." },
];

export default function OnboardingCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const pending = useRef<number | null>(null);
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children) as HTMLElement[];
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    const target = slides[clamped];
    if (!target) return;
    pending.current = clamped;
    clearTimeout(pendingTimer.current);
    pendingTimer.current = setTimeout(() => { pending.current = null; }, 700);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }, []);

  // Actualiza el contador según qué slide queda más cerca del borde izquierdo
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(track.children) as HTMLElement[];
        const left = track.scrollLeft + track.offsetLeft;
        let closest = 0;
        let min = Infinity;
        slides.forEach((s, i) => {
          const d = Math.abs(s.offsetLeft - left);
          if (d < min) { min = d; closest = i; }
        });
        setIndex(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  const current = () => pending.current ?? index;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(current() + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current() - 1); }
  };

  return (
    <section className={styles.root} aria-roledescription="carrusel" aria-label="Flujo de onboarding">
      <div
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {SLIDES.map((s, i) => {
          const ratio = s.w / s.h;
          return (
            <figure
              key={s.src}
              className={styles.slide}
              style={{ "--ratio": ratio } as React.CSSProperties}
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${SLIDES.length}`}
            >
              <div className={styles.frame}>
                <Image
                  src={s.src}
                  alt={s.title}
                  width={s.w}
                  height={s.h}
                  sizes="(max-width: 640px) 80vw, 800px"
                  className={styles.img}
                  priority={i < 2}
                />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.num}>{i + 1}</span>
                <span className={styles.captionText}>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className={styles.controls}>
        <div className={styles.dots} aria-hidden="true">
          {SLIDES.map((_, i) => (
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
          <span className={styles.counter} aria-live="polite">{index + 1} / {SLIDES.length}</span>
          <button type="button" className={styles.arrow} onClick={() => goTo(current() - 1)} disabled={index === 0} aria-label="Pantalla anterior">←</button>
          <button type="button" className={styles.arrow} onClick={() => goTo(current() + 1)} disabled={index === SLIDES.length - 1} aria-label="Pantalla siguiente">→</button>
        </div>
      </div>
    </section>
  );
}
