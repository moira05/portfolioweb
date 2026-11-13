"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import styles from "./SplitCover.module.css";

interface Props {
  before: string;
  after: string;
  phone: { src: string; alt: string };
  isHovered: boolean;
}

export default function SplitCover({ before, after, phone, isHovered }: Props) {
  const [statIn, setStatIn] = useState(false);
  const [checkPlay, setCheckPlay] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);
  const isTouchRef = useRef(false);
  const prevHoveredRef = useRef(false);

  const triggerCheck = useCallback(() => {
    flushSync(() => setCheckPlay(false));
    setCheckPlay(true);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isTouchRef.current = window.matchMedia("(hover: none)").matches;

    if (reduce) {
      setStatIn(true);
      setCheckPlay(true);
      return;
    }

    const el = coverRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatIn(true);
          triggerCheck();
          if (!isTouchRef.current) io.disconnect();
        } else if (isTouchRef.current) {
          setStatIn(false);
          setCheckPlay(false);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [triggerCheck]);

  // Desktop: replay check on hover
  useEffect(() => {
    if (isTouchRef.current) return;
    if (isHovered && !prevHoveredRef.current) triggerCheck();
    prevHoveredRef.current = isHovered;
  }, [isHovered, triggerCheck]);

  return (
    <div ref={coverRef} className={styles.root}>
      <div className={`${styles.stat} ${statIn ? styles.statIn : ""}`}>
        <div className={styles.statRow}>
          <span className={styles.old}>{before}</span>
          <span className={styles.newLine}>
            <span className={styles.arrow}>→</span>
            <span className={styles.newVal}>{after}</span>
          </span>
        </div>
      </div>

      <div className={styles.phone}>
        <div className={styles.phoneInner}>
          <Image
            src={phone.src}
            alt={phone.alt}
            fill
            sizes="(max-width: 960px) 100px, 150px"
            className="object-cover object-top"
          />
        </div>
        <svg
          viewBox="0 0 358 638"
          preserveAspectRatio="none"
          aria-hidden="true"
          className={`${styles.check} ${checkPlay ? styles.checkPlay : ""}`}
        >
          <circle cx="179" cy="120" r="39.5" fill="#d9f4eb" stroke="#1c8367" strokeWidth="2.2" />
          <circle
            className={styles.ring}
            cx="179"
            cy="120"
            r="40"
            fill="none"
            stroke="#1c8367"
            strokeWidth="2"
          />
          <path
            className={styles.tick}
            pathLength="1"
            d="M165 120.5 L174 129.5 L193 109"
            fill="none"
            stroke="#1c8367"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
