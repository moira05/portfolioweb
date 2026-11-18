"use client";

import { useEffect, useRef } from "react";
import { siFigma, siAnthropic, siCursor, siNotion, siJira } from "simple-icons";
import { TOOLKIT } from "@/data/toolkit";
import styles from "./ToolkitBlock.module.css";

/* ── Custom pixel-art SVGs ─────────────────────────────────────────── */

function IconClaudeCode() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="100%" height="100%" shapeRendering="crispEdges">
      {/* ">" chevron */}
      <rect x="2" y="2" width="2" height="2" />
      <rect x="4" y="6" width="2" height="2" />
      <rect x="6" y="10" width="2" height="2" />
      <rect x="4" y="14" width="2" height="2" />
      <rect x="2" y="18" width="2" height="2" />
      {/* "_" cursor */}
      <rect x="10" y="20" width="10" height="2" />
    </svg>
  );
}

function IconChatGPT() {
  /* Simplified OpenAI logo — interlocking polygons approximated as 2 overlapping hexagons */
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="100%" height="100%">
      <path d="M22.28 9.82a6 6 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-3.99 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zM13.26 22.5a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .4-.68V11.2l2.02 1.17a.07.07 0 0 1 .04.05v5.58A4.5 4.5 0 0 1 13.26 22.5zM3.6 18.37a4.47 4.47 0 0 1-.54-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06l-4.84 2.8A4.5 4.5 0 0 1 3.6 18.37zM2.34 7.9a4.49 4.49 0 0 1 2.37-1.97v5.68a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0L3.98 13.9A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86-5.82-3.36 2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.1v-5.68a.79.79 0 0 0-.41-.68zm2.01-3.02-.14-.09-4.77-2.78a.78.78 0 0 0-.79 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.31 12.86 6.29 11.7a.08.08 0 0 1-.04-.06V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08-4.78 2.76a.79.79 0 0 0-.4.68v6.72zm1.1-2.37 2.6-1.5 2.61 1.5v3L11.5 15 9 13.49v-3z" />
    </svg>
  );
}

function IconAmplitude() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="100%" height="100%" shapeRendering="crispEdges">
      {/* Bell-curve bar chart */}
      <rect x="1"  y="20" width="2" height="2" />
      <rect x="4"  y="16" width="2" height="6" />
      <rect x="7"  y="12" width="2" height="10" />
      <rect x="10" y="6"  width="2" height="16" />
      <rect x="13" y="10" width="2" height="12" />
      <rect x="16" y="14" width="2" height="8" />
      <rect x="19" y="18" width="2" height="4" />
    </svg>
  );
}

/* ── Icon renderer ─────────────────────────────────────────────────── */

const SI_ICONS: Record<string, { path: string }> = {
  figma:     siFigma,
  anthropic: siAnthropic,
  cursor:    siCursor,
  notion:    siNotion,
  jira:      siJira,
};

function ToolIcon({ slug }: { slug: string }) {
  if (slug === "custom-claudecode") return <IconClaudeCode />;
  if (slug === "custom-chatgpt")    return <IconChatGPT />;
  if (slug === "custom-amplitude")  return <IconAmplitude />;

  const icon = SI_ICONS[slug];
  if (!icon) return null;

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="100%" height="100%">
      <path d={icon.path} />
    </svg>
  );
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function ToolkitBlock() {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const observers = tileRefs.current.map((tile, i) => {
      if (!tile) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => tile.classList.add(styles.visible), i * 40);
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      obs.observe(tile);
      return obs;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  return (
    <div>
      <p className={styles.label}>Herramientas</p>
      <div className={styles.grid}>
        {TOOLKIT.map((tool, i) => (
          <div
            key={tool.name}
            ref={el => { tileRefs.current[i] = el; }}
            className={styles.tile}
            tabIndex={0}
            role="img"
            aria-label={tool.name}
          >
            <div className={styles.iconWrap}>
              <ToolIcon slug={tool.iconSlug} />
            </div>
            <span className={styles.name}>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
