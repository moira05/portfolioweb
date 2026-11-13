"use client";

import { useEffect, useRef } from "react";
import styles from "./PixelIcons.module.css";
import { PIXEL_GRIDS } from "@/data/pixelGrids";
import { ICON_PHRASES } from "@/data/iconPhrases";

// ── Constants ──────────────────────────────────────────────────────────────
const INK = "#14142b";
const GRID_SIZE = 21;
const HEART_GRID = [".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."];
const HEART_COLORS = ["#ff5c8a", "#e8426b", "#ff8fb0"];

const HELADO_IDX  = ICON_PHRASES.findIndex(p => p.key === "helado");
const ESTRELLA_IDX = ICON_PHRASES.findIndex(p => p.key === "estrella");

interface HeartParticle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  rot: number; vr: number;
  color: string;
  life: number;
  sway: number;
}

// ── Component ──────────────────────────────────────────────────────────────
export default function PixelIcons() {
  const wrapRefs   = useRef<(HTMLDivElement   | null)[]>([]);
  const btnRefs    = useRef<(HTMLButtonElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const tipRefs    = useRef<(HTMLDivElement    | null)[]>([]);
  const heartsRef  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce  = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    const dpr = () => Math.min(window.devicePixelRatio || 1, 3);
    const cellCss = () => window.innerWidth <= 900 ? 4.4 : 6;

    // ── Per-icon mutable state (not React state — no re-renders needed) ──
    const st = ICON_PHRASES.map(() => ({
      jumping: false,
      locked: false,
      tipTimer: undefined as ReturnType<typeof setTimeout> | undefined,
    }));
    let kissBusy = false;

    // ── Hearts canvas ──────────────────────────────────────────────────────
    let heartsList: HeartParticle[] = [];
    let heartsRaf = 0;

    function fitHearts() {
      const hc = heartsRef.current;
      if (!hc) return;
      const d = dpr();
      hc.width  = window.innerWidth  * d;
      hc.height = window.innerHeight * d;
      const ctx = hc.getContext("2d");
      if (ctx) ctx.setTransform(d, 0, 0, d, 0, 0);
    }

    function addHeart(p: HeartParticle) {
      heartsList.push(p);
      if (!heartsRaf) heartsRaf = requestAnimationFrame(runHearts);
    }

    function runHearts() {
      heartsRaf = 0;
      const hc = heartsRef.current;
      if (!hc) return;
      const ctx = hc.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      heartsList = heartsList.filter(p => p.life-- > 0 && p.y < window.innerHeight + 40 && p.y > -80);

      for (const p of heartsList) {
        p.vx *= 0.992;
        p.x  += p.vx + Math.sin((p.life + p.sway * 10) * 0.12) * 0.45;
        p.y  += p.vy;
        p.rot += p.vr;

        ctx.save();
        ctx.globalAlpha = Math.min(1, Math.max(0, p.life / 30));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        const s = p.size;
        const hw = HEART_GRID[0].length * s;
        const hh = HEART_GRID.length    * s;
        HEART_GRID.forEach((row, j) => {
          [...row].forEach((c, i) => {
            if (c === "#") ctx.fillRect(i * s - hw / 2, j * s - hh / 2, s, s);
          });
        });
        ctx.restore();
      }

      if (heartsList.length > 0) {
        heartsRaf = requestAnimationFrame(runHearts);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }

    // ── Canvas drawing ─────────────────────────────────────────────────────
    function drawIcon(i: number) {
      const canvas = canvasRefs.current[i];
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const cd = Math.max(2, Math.round(cellCss() * dpr()));
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = INK;
      const grid = PIXEL_GRIDS[ICON_PHRASES[i].key];
      grid.forEach((row, j) => {
        [...row].forEach((c, k) => {
          if (c === "#") ctx.fillRect(k * cd, j * cd, cd, cd);
        });
      });
    }

    function resizeIcon(i: number) {
      const canvas = canvasRefs.current[i];
      if (!canvas) return;
      const d  = dpr();
      const cd = Math.max(2, Math.round(cellCss() * d));
      canvas.width  = GRID_SIZE * cd;
      canvas.height = GRID_SIZE * cd;
      canvas.style.width  = `${GRID_SIZE * cd / d}px`;
      canvas.style.height = `${GRID_SIZE * cd / d}px`;
      drawIcon(i);
    }

    // ── Bubble ─────────────────────────────────────────────────────────────
    function say(i: number, text?: string | null, ms?: number) {
      if (st[i].locked && text == null) return;
      const tip  = tipRefs.current[i];
      const wrap = wrapRefs.current[i];
      if (!tip || !wrap) return;

      if (text != null) tip.textContent = text;

      const wRect = wrap.getBoundingClientRect();
      const tw    = tip.offsetWidth;
      const cx    = wRect.left + wRect.width / 2;
      const m     = 12;
      let shift   = 0;
      if (cx - tw / 2 < m)                       shift = m - (cx - tw / 2);
      else if (cx + tw / 2 > window.innerWidth - m) shift = window.innerWidth - m - (cx + tw / 2);
      tip.style.setProperty("--shift", `${shift}px`);
      tip.classList.add(styles.show);

      clearTimeout(st[i].tipTimer);
      if (ms != null || isTouch) {
        st[i].tipTimer = setTimeout(() => hush(i, true), ms ?? 2400);
      }
    }

    function hush(i: number, force = false) {
      if (st[i].locked && !force) return;
      clearTimeout(st[i].tipTimer);
      st[i].tipTimer = undefined;
      const tip = tipRefs.current[i];
      if (!tip) return;
      tip.classList.remove(styles.show);
      setTimeout(() => {
        if (tip && !tip.classList.contains(styles.show)) {
          tip.textContent = ICON_PHRASES[i].phrase;
        }
      }, 250);
    }

    // ── Hop (hover squash-stretch) ─────────────────────────────────────────
    function hop(i: number) {
      const btn = btnRefs.current[i];
      if (!btn) return;
      btn.classList.remove(styles.hop);
      void btn.offsetWidth; // force reflow to restart animation
      btn.classList.add(styles.hop);
      btn.addEventListener("animationend", () => btn.classList.remove(styles.hop), { once: true });
    }

    // ── Jump (click on non-helado) ─────────────────────────────────────────
    function jump(i: number) {
      if (st[i].jumping || kissBusy) return;
      st[i].jumping = true;
      const btn = btnRefs.current[i];
      if (!btn) return;
      btn.classList.remove(styles.hop);
      const dir = Math.random() < 0.5 ? -1 : 1;
      const anim = btn.animate([
        { transform: "translateY(0) rotate(0) scale(1,1)" },
        { transform: "translateY(2px) rotate(0) scale(1.14,.84)", offset: 0.16 },
        { transform: `translateY(-38px) rotate(${8 * dir}deg) scale(.93,1.12)`, offset: 0.46 },
        { transform: `translateY(-26px) rotate(${-6 * dir}deg) scale(.97,1.05)`, offset: 0.62 },
        { transform: `translateY(0) rotate(${3 * dir}deg) scale(1.1,.9)`, offset: 0.84 },
        { transform: "translateY(0) rotate(0) scale(1,1)" },
      ], { duration: 760, easing: "cubic-bezier(.3,.7,.4,1)" });
      anim.onfinish = () => { st[i].jumping = false; };
      say(i, null, 2200);
    }

    // ── Kiss (helado → estrella) ───────────────────────────────────────────
    function kiss() {
      const hi = HELADO_IDX, si = ESTRELLA_IDX;
      if (kissBusy || st[hi].jumping) return;
      kissBusy = true;

      const heladoBtn   = btnRefs.current[hi];
      const estrellaBtn = btnRefs.current[si];
      const helCanvas   = canvasRefs.current[hi];
      const estCanvas   = canvasRefs.current[si];
      if (!heladoBtn || !estrellaBtn || !helCanvas || !estCanvas) {
        kissBusy = false;
        return;
      }

      heladoBtn.classList.remove(styles.hop);
      hush(hi);
      st[hi].locked = true;
      st[si].locked = true;

      const a  = helCanvas.getBoundingClientRect();
      const b  = estCanvas.getBoundingClientRect();
      const ax = a.left + a.width / 2,  ay = a.top + a.height / 2;
      const bx = b.left + b.width / 2,  by = b.top + b.height / 2;
      const dx = (bx - ax) * 0.46, dy = (by - ay) * 0.3;
      const lean = bx < ax ? -13 : 13;

      say(hi, "¡mwah!", 1500);

      heladoBtn.animate([
        { transform: "translate(0,0) rotate(0) scale(1,1)" },
        { transform: `translate(0,-10px) rotate(${-lean * 0.3}deg) scale(.94,1.08)`, offset: 0.18 },
        { transform: `translate(${dx}px,${dy}px) rotate(${lean}deg) scale(1.04,.96)`, offset: 0.38 },
        { transform: `translate(${dx}px,${dy}px) rotate(${lean}deg) scale(1.1,.9)`, offset: 0.5 },
        { transform: `translate(${dx}px,${dy}px) rotate(${lean}deg) scale(1.04,.96)`, offset: 0.62 },
        { transform: "translate(0,0) rotate(0) scale(1,1)" },
      ], { duration: 1500, easing: "cubic-bezier(.4,.1,.3,1)" });

      setTimeout(() => {
        // contact moment — hearts burst from the gap between the two
        const mx = (ax + bx) / 2;
        const my = (ay + by) / 2 + 6;
        for (let n = 0; n < 11; n++) {
          addHeart({
            x: mx + (Math.random() - 0.5) * 46,
            y: my + (Math.random() - 0.5) * 26,
            vx: (Math.random() - 0.5) * 0.9,
            vy: -0.8 - Math.random() * 1,
            size: 2.6 + Math.random() * 1.6,
            rot: 0, vr: 0,
            color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
            life: 70 + Math.random() * 40,
            sway: Math.random() * 6,
          });
        }

        say(si, "¡Atrevido! Pero me gustó", 1400);

        estrellaBtn.animate([
          { transform: "translate(0,0) rotate(0) scale(1,1)" },
          { transform: "translate(0,2px) rotate(0) scale(1.12,.86)", offset: 0.2 },
          { transform: "translate(0,-20px) rotate(-10deg) scale(.95,1.1)", offset: 0.5 },
          { transform: "translate(0,0) rotate(6deg) scale(1.06,.94)", offset: 0.78 },
          { transform: "translate(0,0) rotate(0) scale(1,1)" },
        ], { duration: 900, easing: "ease-out" });
      }, 560);

      setTimeout(() => {
        kissBusy = false;
        st[hi].locked = false;
        st[si].locked = false;
      }, 2000);
    }

    // ── Init each icon ─────────────────────────────────────────────────────
    const cleanups: (() => void)[] = [];

    ICON_PHRASES.forEach((item, i) => {
      if (!reduce) wrapRefs.current[i]?.classList.add(styles.live);
      resizeIcon(i);

      const btn = btnRefs.current[i];
      if (!btn) return;

      if (reduce) {
        btn.disabled = true;
        btn.setAttribute("aria-hidden", "true");
        btn.removeAttribute("aria-label");
        return;
      }

      const onEnter = () => { hop(i); say(i); };
      const onFocus = () => { hop(i); say(i); };
      const onLeave = () => { if (!isTouch) hush(i); };
      const onBlur  = () => hush(i);
      const onClick = () => { item.key === "helado" ? kiss() : jump(i); };

      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("focus",      onFocus);
      btn.addEventListener("mouseleave", onLeave);
      btn.addEventListener("blur",       onBlur);
      btn.addEventListener("click",      onClick);

      cleanups.push(() => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("focus",      onFocus);
        btn.removeEventListener("mouseleave", onLeave);
        btn.removeEventListener("blur",       onBlur);
        btn.removeEventListener("click",      onClick);
      });
    });

    // ── Resize ─────────────────────────────────────────────────────────────
    function handleResize() {
      ICON_PHRASES.forEach((_, i) => resizeIcon(i));
      fitHearts();
    }
    window.addEventListener("resize", handleResize);
    fitHearts();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(heartsRaf);
      st.forEach(s => clearTimeout(s.tipTimer));
      cleanups.forEach(fn => fn());
    };
  }, []);

  return (
    <>
      <div className={styles.icons}>
        {ICON_PHRASES.map((item, i) => (
          <div
            key={item.key}
            ref={el => { wrapRefs.current[i] = el; }}
            className={styles.float}
            style={{
              "--dur":   `${3.2 + (i * 0.55) % 2}s`,
              "--delay": `${-i * 0.7}s`,
            } as React.CSSProperties}
          >
            <button
              ref={el => { btnRefs.current[i] = el; }}
              type="button"
              className={styles.icon}
              aria-label={`${item.label}: tocá para ver un mensaje`}
              aria-describedby={`tip-${item.key}`}
            >
              <canvas
                ref={el => { canvasRefs.current[i] = el; }}
                aria-hidden="true"
              />
            </button>
            <div
              ref={el => { tipRefs.current[i] = el; }}
              className={styles.bubble}
              id={`tip-${item.key}`}
              role="tooltip"
            >
              {item.phrase}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed canvas for kiss hearts — pointer-events: none in CSS */}
      <canvas ref={heartsRef} className={styles.hearts} aria-hidden="true" />
    </>
  );
}
