"use client";

import { Fragment, useEffect, useRef } from "react";
import styles from "./SectionTitle.module.css";

const LETTER_DELAY_MS = 26;
const OBSERVER_THRESHOLD = 0.4;

interface Props {
  children: string;
  eyebrow?: string;
  accent?: string;
}

export default function SectionTitle({ children, eyebrow, accent }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const wrap = wrapRef.current;
    const heading = headingRef.current;
    if (!wrap || !heading) return;

    wrap.classList.add(styles.mounted);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wrap.classList.add(styles.revealed);
          io.disconnect();
        }
      },
      { threshold: OBSERVER_THRESHOLD },
    );

    // One rAF so the browser commits the mounted (hidden) state before IO fires
    const raf = requestAnimationFrame(() => io.observe(heading));
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  const mainWords = children.split(" ").filter(Boolean);
  const accentWords = accent ? accent.split(" ").filter(Boolean) : [];
  const fullText = accent ? `${children} ${accent}` : children;

  let letterIndex = 0;

  return (
    <div ref={wrapRef} className="mb-10">
      {eyebrow && (
        <p className={`mb-3 font-manrope text-[18px] font-normal text-[#5e5c80] ${styles.eyebrow}`}>
          {eyebrow}
        </p>
      )}
      <h2
        ref={headingRef}
        aria-label={fullText}
        className="max-w-[16ch] font-manrope text-[clamp(32px,5.6vw,70px)] font-bold leading-[1.02] tracking-[-0.03em] text-[#14142b]"
      >
        {/* aria-hidden: screen readers use aria-label on h2 */}
        <span aria-hidden="true">
          {mainWords.map((word, wi) => {
            const start = letterIndex;
            letterIndex += word.length;
            const addSpace = wi < mainWords.length - 1 || accentWords.length > 0;
            return (
              <Fragment key={wi}>
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
                {addSpace && " "}
              </Fragment>
            );
          })}
          {accentWords.map((word, wi) => {
            const start = letterIndex;
            letterIndex += word.length;
            return (
              <Fragment key={`a${wi}`}>
                <span className={`${styles.word} font-vollkorn font-medium italic text-[#8a7de0]`}>
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
                {wi < accentWords.length - 1 && " "}
              </Fragment>
            );
          })}
        </span>
      </h2>
    </div>
  );
}
