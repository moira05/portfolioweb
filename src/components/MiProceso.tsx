"use client";

import { useEffect, useRef, useState } from "react";
import DrawUnderline from "./DrawUnderline";

// ─── Grid constants ───────────────────────────────────────────────────────────
const P  = 5; // px per grid cell
const NS = 7; // icon size in cells

// ─── Colors (adapted to site palette) ────────────────────────────────────────
const C: Record<string, string> = {
  bg:    "#ffffff",
  ink:   "#171717",
  muted: "#888888",
  icon:  "#171717",
  path:  "#b0aaf2",
  lav:   "#b0aaf2",
  spark: "#c026d3",
  sans:  "'Manrope', system-ui, sans-serif",
};

// ─── 7×7 pixel bitmaps (from maqueta) ────────────────────────────────────────
const ICON: Record<string, string[]> = {
  window: ["#######","#.#.#.#","#######","#.....#","#.....#","#.....#","#######"],
  chat:   [".#####.","#.....#","#.#.#.#","#.....#",".#####.","..#....","..#...."],
  spark:  ["...#...",".#.#.#.","..###..","#######","..###..",".#.#.#.","...#..."],
  bulb:   ["..###..",".#...#.",".#...#.",".#...#.","..#.#..","..###..","..###.."],
  term:   ["#######","#######","#.....#","#.#...#","#..#..#","#.#.###","#######"],
  flag:   ["#####..","######.","#####..","#......","#......","#......","###...."],
};

// ─── Node definitions ─────────────────────────────────────────────────────────
interface NodeState {
  label: string;
  icon:  string;
  x: number; y: number;
  mv:   { fx:number; fy:number; tx:number; ty:number; start:number; dur:number } | null;
  vis:  number;
  va:   { from:number; to:number; start:number; dur:number } | null;
  role: "tool" | "main" | "alt";
  lit:  boolean;
}

function makeNodes(): Record<string, NodeState> {
  const defs: Record<string, Pick<NodeState, "label" | "icon">> = {
    chatgpt: { label: "ChatGPT",     icon: "chat"   },
    v0:      { label: "v0",          icon: "window" },
    stitch:  { label: "Stitch",      icon: "window" },
    mobbin:  { label: "Mobbin",      icon: "window" },
    figma:   { label: "Figma",       icon: "window" },
    claude:  { label: "Claude",      icon: "spark"  },
    idea:    { label: "Idea",        icon: "bulb"   },
    code:    { label: "Claude Code", icon: "term"   },
    live:    { label: "Publicado",   icon: "flag"   },
  };
  const nodes: Record<string, NodeState> = {};
  for (const k in defs)
    nodes[k] = { ...defs[k], x: 0, y: 0, mv: null, vis: 0, va: null, role: "tool", lit: false };
  return nodes;
}

// ─── Layout (fractional positions for antes / ahora, wide / tall) ─────────────
type LayoutName = "antes" | "ahora";
const LAYOUT: Record<LayoutName, { wide: Record<string,[number,number]>; tall: Record<string,[number,number]> }> = {
  antes: {
    wide: { chatgpt:[.10,.20], v0:[.38,.12], stitch:[.64,.30], mobbin:[.90,.14], figma:[.22,.70], claude:[.72,.74] },
    tall: { chatgpt:[.22,.08], v0:[.76,.17], stitch:[.30,.37], mobbin:[.80,.51], figma:[.22,.69], claude:[.72,.83] },
  },
  ahora: {
    wide: { idea:[.08,.38], claude:[.36,.38], code:[.64,.38], live:[.91,.38], chatgpt:[.36,.78] },
    tall: { idea:[.28,.08], claude:[.28,.35], code:[.28,.60], live:[.28,.85], chatgpt:[.74,.35] },
  },
};

const ANTES_KEYS = ["chatgpt","v0","stitch","mobbin","figma","claude"];
const AHORA_KEYS = ["idea","claude","code","live","chatgpt"];

// ─── Pure helpers ─────────────────────────────────────────────────────────────
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rand  = (n: number) => Math.floor(Math.random() * n);
const quant = (v: number, steps = 4) => Math.ceil(clamp(v, 0, 1) * steps) / steps;

function easeBurst(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
}

function hashPx(k: string, i: number): number {
  let h = 2166136261;
  const s = k + ":" + i;
  for (let c = 0; c < s.length; c++) { h ^= s.charCodeAt(c); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 1000) / 1000;
}

// ─── Trail / seg types ────────────────────────────────────────────────────────
interface SegOpts {
  ghost?:  boolean;
  dashed?: boolean;
  fade?:   number;
  color?:  string;
}
interface SegItem {
  pts:   [number,number][];
  dur:   number;
  start: number;
  idx:   number;
  opts:  SegOpts;
  res:   () => void;
}
interface TrailCell {
  x: number; y: number;
  born: number;
  fade: number;
  die:  number | null;
  color: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MiProceso() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const [uiStage, setUiStage] = useState<0 | 1>(0);

  // All mutable animation state in one ref — never triggers re-renders
  const S = useRef({
    nodes: makeNodes(),
    trail: [] as TrailCell[],
    segs:  [] as SegItem[],
    epoch: 0,
    currentLayout: "antes" as LayoutName,
    wide: true,
    W: 0, H: 0, cols: 0, rows: 0, dpr: 1,
  });

  const rafRef        = useRef<number>(0);
  const runRef        = useRef<(fromStage: 0 | 2) => void>(() => {});
  const showStaticRef = useRef<(i: 0 | 1) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap   = wrapRef.current;
    if (!canvas || !wrap) return;
    // aliases to satisfy TypeScript inside nested functions (already guarded above)
    const wrapEl   = wrap;
    const canvasEl = canvas;

    const s      = S.current;
    const ctx    = canvasEl.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      const r = wrapEl.getBoundingClientRect();
      s.dpr  = window.devicePixelRatio || 1;
      s.W    = r.width;
      s.H    = r.height;
      canvasEl.width  = Math.round(s.W * s.dpr);
      canvasEl.height = Math.round(s.H * s.dpr);
      s.cols = Math.floor(s.W / P);
      s.rows = Math.floor(s.H / P);
      s.wide = s.cols / s.rows >= 1.15;
    }

    // ── Coordinate helpers ────────────────────────────────────────────────────
    function toCell([fx, fy]: [number,number]) {
      return {
        x: clamp(Math.round(fx * s.cols), NS, s.cols - NS - 1),
        y: clamp(Math.round(fy * s.rows), NS, s.rows - NS - 4),
      };
    }
    function placeAll(name: LayoutName) {
      const L = LAYOUT[name][s.wide ? "wide" : "tall"];
      for (const k in L) { const c = toCell(L[k]); Object.assign(s.nodes[k], { x: c.x, y: c.y, mv: null }); }
    }
    function target(k: string, name: LayoutName) {
      return toCell(LAYOUT[name][s.wide ? "wide" : "tall"][k]);
    }

    // ── Path builders ─────────────────────────────────────────────────────────
    function messyPath(a: NodeState, b: NodeState): [number,number][] {
      const pts: [number,number][] = [[a.x, a.y]];
      let x = a.x, y = a.y, horiz = Math.random() < .5, detours = 0, g = 0;
      while ((x !== b.x || y !== b.y) && g++ < 400) {
        const dx = b.x - x, dy = b.y - y;
        if (horiz && dx === 0) horiz = false; else if (!horiz && dy === 0) horiz = true;
        let dir: number, run: number;
        if (detours < 3 && Math.random() < .25) {
          detours++; dir = Math.random() < .5 ? 1 : -1; run = 2 + rand(6);
        } else {
          const d = horiz ? dx : dy; dir = Math.sign(d); run = Math.min(Math.abs(d), 2 + rand(10));
        }
        for (let i = 0; i < run; i++) {
          if (horiz) x = clamp(x + dir, 1, s.cols - 2);
          else       y = clamp(y + dir, 1, s.rows - 2);
          pts.push([x, y]);
        }
        horiz = !horiz;
      }
      return pts;
    }

    function cleanPath(a: NodeState, b: NodeState): [number,number][] {
      const pts: [number,number][] = [[a.x, a.y]];
      let x = a.x, y = a.y;
      const push = () => pts.push([x, y]);
      if (a.y === b.y || a.x === b.x) {
        while (x !== b.x) { x += Math.sign(b.x - x); push(); }
        while (y !== b.y) { y += Math.sign(b.y - y); push(); }
      } else if (s.wide) {
        const m = Math.round((a.x + b.x) / 2);
        while (x !== m)   { x += Math.sign(m - x);   push(); }
        while (y !== b.y) { y += Math.sign(b.y - y); push(); }
        while (x !== b.x) { x += Math.sign(b.x - x); push(); }
      } else {
        const m = Math.round((a.y + b.y) / 2);
        while (y !== m)   { y += Math.sign(m - y);   push(); }
        while (x !== b.x) { x += Math.sign(b.x - x); push(); }
        while (y !== b.y) { y += Math.sign(b.y - y); push(); }
      }
      return pts;
    }

    // ── Trail / seg helpers ────────────────────────────────────────────────────
    const now = () => performance.now();

    function addCells(pts: [number,number][], from: number, to: number, o: SegOpts) {
      const t = now();
      for (let i = from; i < to; i++) {
        if (o.ghost) continue;
        if (o.dashed && i % 2) continue;
        s.trail.push({ x: pts[i][0], y: pts[i][1], born: t, fade: o.fade ?? Infinity, die: null, color: o.color ?? "path" });
      }
    }

    function seg(pts: [number,number][], dur: number, opts: SegOpts = {}): Promise<void> {
      return new Promise(res => {
        if (dur <= 0) { addCells(pts, 0, pts.length, opts); res(); return; }
        s.segs.push({ pts, dur, start: now(), idx: 0, opts, res });
      });
    }

    function setVis(keys: string[], to: number, dur: number) {
      const t = now();
      keys.forEach(k => { const n = s.nodes[k]; n.va = { from: n.vis, to, start: t, dur: Math.max(1, dur) }; });
    }

    function moveNode(k: string, to: { x:number; y:number }, dur: number) {
      const n = s.nodes[k];
      n.mv = { fx: n.x, fy: n.y, tx: to.x, ty: to.y, start: now(), dur: Math.max(1, dur) };
    }

    function dissolveTrail(dur: number) {
      const t = now();
      s.trail.forEach(c => { if (!c.die) c.die = t + rand(dur); });
    }

    function litOnly(keys: string[]) {
      for (const k in s.nodes) s.nodes[k].lit = keys.includes(k);
    }

    function resetTo(layout: LayoutName, visibleKeys: string[]) {
      s.trail = []; s.segs = []; s.currentLayout = layout;
      for (const k in s.nodes) {
        const n = s.nodes[k];
        n.vis = visibleKeys.includes(k) ? 1 : 0;
        n.va = null; n.mv = null; n.role = "tool"; n.lit = false;
      }
      placeAll(layout);
    }

    // ── Epoch / cancel ────────────────────────────────────────────────────────
    const CANCEL = Symbol("cancel");
    const wait = (ms: number, ep: number) => new Promise<void>((res, rej) =>
      setTimeout(() => ep === s.epoch ? res() : rej(CANCEL), ms)
    );
    const chk = (ep: number) => { if (ep !== s.epoch) throw CANCEL; };

    // ── Phases ────────────────────────────────────────────────────────────────
    async function phaseAntes(ep: number, instant = false) {
      setUiStage(0);
      resetTo("antes", []);
      setVis(ANTES_KEYS, 1, instant ? 0 : 500);
      if (!instant) await wait(450, ep);
      const seq = ["chatgpt","v0","stitch","v0","mobbin","figma","claude","chatgpt","stitch","figma","claude","v0"];
      for (let i = 0; i < seq.length - 1; i++) {
        litOnly([seq[i]]);
        await seg(messyPath(s.nodes[seq[i]], s.nodes[seq[i + 1]]), instant ? 0 : 220 + rand(300), {
          fade: instant ? Infinity : 2400, color: "lav",
        });
        chk(ep);
        litOnly([seq[i + 1]]);
        if (!instant) await wait(70 + rand(420), ep);
      }
      if (!instant) await wait(500, ep);
    }

    async function phaseCambio(ep: number) {
      setUiStage(1);
      litOnly([]);
      dissolveTrail(650);
      setVis(["v0","stitch","mobbin","figma"], 0, 700);
      await wait(550, ep);
      s.currentLayout = "ahora";
      moveNode("claude",  target("claude",  "ahora"), 650);
      moveNode("chatgpt", target("chatgpt", "ahora"), 800);
      s.nodes.claude.role  = "main";
      s.nodes.chatgpt.role = "alt";
      ["idea","code","live"].forEach(k => Object.assign(s.nodes[k], target(k, "ahora")));
      await wait(250, ep);
      setVis(["idea","code","live"], 1, 600);
      await wait(900, ep);
      s.trail = [];
    }

    async function phaseAhora(ep: number, instant = false) {
      setUiStage(1);
      if (instant) {
        resetTo("ahora", AHORA_KEYS);
        s.nodes.claude.role  = "main";
        s.nodes.chatgpt.role = "alt";
      }
      const chain = ["idea","claude","code","live"];
      for (let i = 0; i < chain.length - 1; i++) {
        litOnly(chain.slice(0, i + 1));
        await seg(cleanPath(s.nodes[chain[i]], s.nodes[chain[i + 1]]), instant ? 0 : 200, { fade: Infinity });
        chk(ep);
        if (!instant) await wait(110, ep);
      }
      litOnly(chain);
      await seg(cleanPath(s.nodes.claude, s.nodes.chatgpt), instant ? 0 : 260, { fade: Infinity, dashed: true, color: "spark" });
      chk(ep);
      s.nodes.chatgpt.lit = true;
      if (instant) return;

      for (let lap = 0; lap < 3; lap++) {
        for (let i = 0; i < chain.length - 1; i++) {
          await seg(cleanPath(s.nodes[chain[i]], s.nodes[chain[i + 1]]), 170, { ghost: true });
          chk(ep);
          await wait(lap === 0 && i === 0 ? 160 : 90, ep);
        }
        await wait(380, ep);
      }
      await wait(1100, ep);
      dissolveTrail(650);
      setVis(AHORA_KEYS, 0, 650);
      await wait(800, ep);
    }

    async function run(fromStage: 0 | 2 = 0) {
      const ep = ++s.epoch;
      try {
        if (fromStage === 2) {
          resetTo("ahora", AHORA_KEYS);
          s.nodes.claude.role  = "main";
          s.nodes.chatgpt.role = "alt";
          await phaseAhora(ep);
        }
        while (true) { await phaseAntes(ep); await phaseCambio(ep); await phaseAhora(ep); }
      } catch (e) { if (e !== CANCEL) console.error(e); }
    }

    async function showStatic(i: 0 | 1) {
      const ep = ++s.epoch;
      try { i === 0 ? await phaseAntes(ep, true) : await phaseAhora(ep, true); }
      catch (e) { if (e !== CANCEL) console.error(e); }
    }

    runRef.current        = run;
    showStaticRef.current = showStatic;

    // ── Render ────────────────────────────────────────────────────────────────
    function cell(x: number, y: number, color: string, a = 1, gap = 1) {
      ctx.globalAlpha = a;
      ctx.fillStyle   = color;
      ctx.fillRect(x * P, y * P, P - gap, P - gap);
    }

    function drawNode(k: string) {
      const n = s.nodes[k];
      if (n.vis <= 0.001) return;
      const half = Math.floor(NS / 2);
      const x0 = Math.round(n.x) - half;
      const y0 = Math.round(n.y) - half;

      // clear background behind icon
      ctx.globalAlpha = 1;
      ctx.fillStyle   = C.bg;
      ctx.fillRect((x0 - 1) * P, (y0 - 1) * P, (NS + 2) * P, (NS + 2) * P);

      // pixel-by-pixel dissolve via hash
      const bmp   = ICON[n.icon];
      const alpha = n.lit || n.role !== "tool" ? 1 : 0.4;
      for (let dy = 0; dy < NS; dy++)
        for (let dx = 0; dx < NS; dx++) {
          if (bmp[dy][dx] !== "#") continue;
          if (hashPx(k, dy * NS + dx) > n.vis) continue;
          cell(x0 + dx, y0 + dy, C.icon, alpha, 0);
        }

      // label
      ctx.globalAlpha  = quant(n.vis, 3);
      ctx.font         = `500 ${s.wide ? 13 : 12}px ${C.sans}`;
      ctx.textBaseline = "top";
      ctx.textAlign    = "center";
      const label = k === "chatgpt" && n.role === "alt" ? "ChatGPT · contenido" : n.label;
      const tw    = ctx.measureText(label).width;
      const cx    = clamp((Math.round(n.x) + .5) * P, tw / 2 + 6, s.W - tw / 2 - 6);
      const ty    = (y0 + NS + 1) * P + 2;
      ctx.fillStyle = C.bg;
      ctx.fillRect(cx - tw / 2 - 4, ty - 2, tw + 8, 19);
      ctx.fillStyle = n.lit || n.role !== "tool" ? C.ink : C.muted;
      ctx.fillText(label, cx, ty);
      ctx.globalAlpha = 1;
    }

    function frame() {
      const t = now();
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, s.W, s.H);

      // update node animations
      for (const k in s.nodes) {
        const n = s.nodes[k];
        if (n.va) {
          const p = clamp((t - n.va.start) / n.va.dur, 0, 1);
          n.vis = n.va.from + (n.va.to - n.va.from) * quant(p, 6);
          if (p >= 1) n.va = null;
        }
        if (n.mv) {
          const p  = clamp((t - n.mv.start) / n.mv.dur, 0, 1);
          const px = easeBurst(clamp(p / 0.6, 0, 1));         // x moves first
          const py = easeBurst(clamp((p - 0.4) / 0.6, 0, 1)); // y follows
          n.x = Math.round(n.mv.fx + (n.mv.tx - n.mv.fx) * px);
          n.y = Math.round(n.mv.fy + (n.mv.ty - n.mv.fy) * py);
          if (p >= 1) n.mv = null;
        }
      }

      // advance segs, collect ghosts
      const ghosts: SegItem[] = [];
      s.segs = s.segs.filter(item => {
        const p = clamp((t - item.start) / item.dur, 0, 1);
        const n = Math.max(1, Math.floor(easeBurst(p) * item.pts.length));
        if (n > item.idx) { addCells(item.pts, item.idx, n, item.opts); item.idx = n; }
        if (item.opts.ghost) ghosts.push(item);
        else if (p < 1) { const h = item.pts[n - 1]; cell(h[0], h[1], C.icon, 1); }
        if (p >= 1) { item.res(); return false; }
        return true;
      });

      // draw trail
      s.trail = s.trail.filter(c => {
        let a = 1;
        if (c.fade !== Infinity) a = 1 - (t - c.born) / c.fade;
        if (c.die && t >= c.die) return false;
        if (a <= 0) return false;
        cell(c.x, c.y, C[c.color], quant(a, 4));
        return true;
      });

      // draw ghost packet (6-cell comet)
      ghosts.forEach(sg => {
        const i = sg.idx - 1;
        for (let k = 0; k < 6; k++) { const q = sg.pts[i - k]; if (q) cell(q[0], q[1], C.spark, 1 - k / 6); }
      });

      for (const k in s.nodes) drawNode(k);
      rafRef.current = requestAnimationFrame(frame);
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const prevW = s.W;
        resize();
        if (Math.abs(s.W - prevW) < 1) return; // ignore scroll-driven height changes
        const st = s.currentLayout === "ahora" ? 1 : 0;
        if (reduce) showStatic(st); else run(st ? 2 : 0);
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    rafRef.current = requestAnimationFrame(frame);
    if (reduce) showStatic(1); else run(0);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      ++s.epoch; // cancels all in-flight async phases
    };
  }, []);

  const handleClick = (i: 0 | 1) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) showStaticRef.current(i);
    else runRef.current(i === 0 ? 0 : 2);
  };

  return (
    <section className="bg-white px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">

          {/* Left column — 40%: título + descripción + tabs */}
          <div className="flex flex-col gap-6 md:w-[40%] md:shrink-0">

            <div className="flex flex-col gap-1 w-fit">
              <h2 className="font-manrope text-[2rem] font-semibold tracking-[0.4px] text-black md:text-[3rem]">
                Mi proceso
              </h2>
              <DrawUnderline />
            </div>

            <p
              aria-live="polite"
              className="font-manrope text-[1rem] font-normal leading-snug text-[#2d2d2d] md:text-[1.25rem]"
            >
              {uiStage === 0
                ? "El proceso estaba fragmentado en múltiples herramientas. Ideaba con ChatGPT, exploraba con v0 y Stitch, buscaba referencias en Mobbin y refinaba con Claude. Un constante ir y venir entre plataformas."
                : "Un recorrido directo. Ideo y maqueto en Claude, con Claude Code lo llevo a código y lo publico. ChatGPT queda para revisar contenido."}
            </p>

            {/* Stage buttons */}
            <div className="flex items-center gap-6">
              <button
                aria-pressed={uiStage === 0}
                onClick={() => handleClick(0)}
                className="relative flex cursor-pointer flex-col gap-[2px] border-none bg-transparent pb-2 text-left"
              >
                <span className={`font-vollkorn text-[1.3rem] leading-tight transition-colors duration-150 ${
                  uiStage === 0 ? "text-[#171717] italic" : "text-[#888]"
                }`}>
                  Antes
                </span>
                <span className={`font-manrope text-[0.6rem] font-semibold tracking-widest uppercase transition-colors duration-150 ${
                  uiStage === 0 ? "text-[#171717]" : "text-[#888]"
                }`}>
                  Febrero 26
                </span>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#b0aaf2] origin-left"
                  style={{ transform: uiStage === 0 ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.3s steps(5)" }}
                />
              </button>

              <span className="font-manrope text-[1.25rem] text-[#aaa]" aria-hidden="true">→</span>

              <button
                aria-pressed={uiStage === 1}
                onClick={() => handleClick(1)}
                className="relative flex cursor-pointer flex-col gap-[2px] border-none bg-transparent pb-2 text-left"
              >
                <span className={`font-vollkorn text-[1.3rem] leading-tight transition-colors duration-150 ${
                  uiStage === 1 ? "text-[#171717] italic" : "text-[#888]"
                }`}>
                  Ahora
                </span>
                <span className={`font-manrope text-[0.6rem] font-semibold tracking-widest uppercase transition-colors duration-150 ${
                  uiStage === 1 ? "text-[#171717]" : "text-[#888]"
                }`}>
                  Septiembre 26
                </span>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-[#b0aaf2] origin-left"
                  style={{ transform: uiStage === 1 ? "scaleX(1)" : "scaleX(0)", transition: "transform 0.3s steps(5)" }}
                />
              </button>
            </div>

          </div>

          {/* Right column — 60%: canvas */}
          <div
            ref={wrapRef}
            className="w-full rounded-[20px] overflow-hidden border border-[#e5e5e5] aspect-[4/5] md:aspect-[16/10] md:flex-1"
          >
            <canvas
              ref={canvasRef}
              className="block w-full h-full"
              role="img"
              aria-label="Animación del proceso de diseño: de varias herramientas dispersas a un recorrido directo Idea → Claude → Claude Code → Publicado."
            />
          </div>

        </div>
      </div>
    </section>
  );
}
