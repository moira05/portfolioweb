"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CycleCover.module.css";

interface CycleImage {
  src: string;
  alt: string;
}

interface Props {
  frame: "phone" | "browser";
  images: CycleImage[];
  isHovered: boolean;
}

export default function CycleCover({ frame, images, isHovered }: Props) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const isTouchRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setIndex(i => (i + 1) % images.length);
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, 1500);
  }, [images.length]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setIndex(0);
  }, []);

  // Touch: cycle via IntersectionObserver when visible
  useEffect(() => {
    isTouchRef.current = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isTouchRef.current || reduce) return;

    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [start, stop]);

  // Desktop: cycle on hover/focus
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || isTouchRef.current) return;
    if (isHovered) start();
    else stop();
  }, [isHovered, start, stop]);

  if (frame === "phone") {
    return (
      <div ref={containerRef} className={styles.phoneBg}>
        <div className={styles.phone}>
          <div className={styles.phoneInner}>
            {images.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                fill
                sizes="210px"
                className={`${styles.cycleImg} ${i === index ? styles.cycleImgOn : ""}`}
              />
            ))}
          </div>
        </div>
        <div className={styles.dots} aria-hidden="true">
          {images.map((_, i) => (
            <span key={i} className={i === index ? styles.dotOn : styles.dot} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.browserBg}>
      <div className={styles.browser}>
        <div className={styles.browserInner}>
          {images.map((img, i) => (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 960px) 50vw, 800px"
              className={`${styles.cycleImg} ${i === index ? styles.cycleImgOn : ""}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.dots} aria-hidden="true">
        {images.map((_, i) => (
          <span key={i} className={i === index ? styles.dotOn : styles.dot} />
        ))}
      </div>
    </div>
  );
}
