"use client";
import { useEffect, useRef, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

type ReplyItem = string | [string, string]; // string or [label, color]

interface Step {
  tab: string;
  title: string;
  desc: string;
  prompt: string;
  reply: ReplyItem[];
  ai: string[];
  me: string[];
  no?: boolean;
  aiText?: string;
}

const STEPS: Step[] = [
  {
    tab: "Discovery",
    title: "Entender antes de diseñar.",
    desc: "Arranco con el problema, no con pantallas. Uso la AI para ordenar el material y detectar huecos; las preguntas que importan se las hago a las personas que conocen el negocio.",
    prompt: "contrastá este PRD con la pantalla actual y marcá dudas, inconsistencias y fuera de alcance",
    reply: ["Dudas marcadas", "Alcance acotado", "Preguntas para producto"],
    ai: ["Ordena el PRD y las capturas", "Marca inconsistencias y huecos"],
    me: ["Qué entra y qué no", "Qué le pregunto a producto"],
  },
  {
    tab: "Exploración",
    title: "Explorar antes de elegir.",
    desc: "Primero bajo a papel las opciones, en formato wireframe, y le pido a la AI opciones comparables en vez de una sola respuesta. Casi nunca me quedo con la primera salida: la critico, la itero y recién ahí decido.",
    prompt: "dame 2 variantes de esta pantalla: una que solo mejore la edición y otra más sintética",
    reply: ["A: mejora la edición", "B: más sintética"],
    ai: ["Genera variantes comparables"],
    me: ["Elijo una y descarto el resto", "Decido por criterio, no por velocidad"],
  },
  {
    tab: "Prototipado",
    title: "Prototipar fiel a producción.",
    desc: "Armo el prototipo en HTML con un kit hecho desde capturas reales (en caso de no contar con DS). Lo llevo a Claude Code y después a Figma para pulir y pasar a desarrollo.",
    prompt: "armá la pantalla de alta con los componentes del kit, respetando las convenciones de producción",
    reply: ["Proto en HTML", "Fiel a producción", "Listo para Figma"],
    ai: ["Arma pantallas con el kit", "Itera rápido los cambios"],
    me: ["Que respete las convenciones reales", "El pulido final en Figma"],
  },
  {
    tab: "UX writing",
    title: "Los textos, con guía.",
    desc: "Armé una skill de contenido que resume la guía de estilo, la voz y el tono, y a partir de ella itero los textos. Si las opciones no me convencen, sigo iterando con ChatGPT, que me parece muy bueno para iterar contenido.",
    prompt: "reescribí este mensaje con la guía de contenido, sin tono de contrato",
    reply: ["Copy consistente", "Voz de la marca"],
    ai: ["Borradores con la guía de estilo"],
    me: ["Reviso que la cumpla", "La voz es mía y de la marca"],
  },
  {
    tab: "Crítica",
    title: "Feedback con prioridades.",
    desc: "Le pido feedback sobre flujos y pantallas a una skill que armé en base a heurísticas y leyes de UX, y que lo ordena por prioridad. Es una segunda mirada, no un veredicto.",
    prompt: "dame feedback de este flujo, ordenado por prioridad",
    reply: [["Crítico", "#d64545"], ["Importante", "#e0a526"], ["Opcional", "#3e9b62"]],
    ai: ["Una segunda mirada con prioridades"],
    me: ["Qué hago con cada punto", "No lo tomo como veredicto"],
  },
  {
    tab: "Lo que no delego",
    title: "Donde la decisión es mía.",
    desc: "Las decisiones de UI y UX las toma diseño. Las reglas de negocio las valido con producto. Y no uso la AI para generar plantillas: si todos hacemos lo mismo, todo termina pareciéndose. Mi criterio es lo que hace que una propuesta sea propia.",
    prompt: "esto no se lo pido a la AI",
    no: true,
    aiText: "Entendido. Esto lo decidís vos.",
    reply: ["Criterio propio", "Evidencia antes de escalar"],
    ai: ["Me da velocidad, no criterio"],
    me: [
      "Las decisiones de UI",
      "Las reglas de negocio, validadas con quien las conoce",
      "Que mis propuestas no se vuelvan genéricas",
    ],
  },
];

const N = STEPS.length;

export default function ComoUsoAI() {
  const [cur, setCur] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showDecide, setShowDecide] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const typerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isFirstRef = useRef(true);

  // ── Scroll tracking ──────────────────────────────────────────────────────────
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!trackRef.current) return;
        const r = trackRef.current.getBoundingClientRect();
        const trackTop = window.scrollY + r.top;
        const trackLen = trackRef.current.offsetHeight - window.innerHeight;
        const p = Math.min(0.9999, Math.max(0, (window.scrollY - trackTop) / trackLen));
        const idx = Math.floor(p * N);
        setCur(prev => (prev !== idx ? idx : prev));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── Typewriter on step change ────────────────────────────────────────────────
  useEffect(() => {
    if (typerRef.current) clearInterval(typerRef.current);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const step = STEPS[cur];
    const text = step.no ? "esto no se lo pido a la AI" : step.prompt;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFirstRef.current) {
      setInfoVisible(false);
      const tFade = setTimeout(() => setInfoVisible(true), 160);
      timersRef.current.push(tFade);
    } else {
      isFirstRef.current = false;
    }

    setShowReply(false);
    setShowDecide(false);

    if (reduce) {
      setTypedText(text);
      setShowReply(true);
      setShowDecide(true);
      return;
    }

    setTypedText("");
    let k = 0;
    typerRef.current = setInterval(() => {
      k++;
      setTypedText(text.slice(0, k));
      if (k >= text.length) {
        clearInterval(typerRef.current!);
        typerRef.current = null;
        const t1 = setTimeout(() => {
          setShowReply(true);
          const t2 = setTimeout(() => setShowDecide(true), 800);
          timersRef.current.push(t2);
        }, 450);
        timersRef.current.push(t1);
      }
    }, 24);

    return () => {
      if (typerRef.current) clearInterval(typerRef.current);
      timersRef.current.forEach(clearTimeout);
    };
  }, [cur]);

  const goTo = (i: number) => {
    if (!trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + r.top;
    const trackLen = trackRef.current.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: trackTop + trackLen * ((i + 0.5) / N),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const step = STEPS[cur];
  const fullPromptText = step.no ? "esto no se lo pido a la AI" : step.prompt;
  const isTyping = typedText.length < fullPromptText.length;
  const fillPct = cur / (N - 1);

  return (
    <div className="bg-[#eeedf5]">
      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <Container className="pb-12 pt-12 md:pt-16">
        <SectionTitle accent="y dónde no." accentColor="#7246D8">Cómo uso AI,</SectionTitle>
        <p className="max-w-[52ch] font-manrope leading-relaxed text-[#5f5c85]" style={{ fontSize: "clamp(19px, 2vw, 24px)" }}>
          La AI está{" "}
          <strong className="font-semibold text-[#14142b]">integrada en mi flujo de diseño</strong>, pero no reemplaza el criterio. Es un{" "}
          <span className="font-semibold text-[#6f5fd6]">acelerador</span>{" "}
          que me deja dedicar más tiempo a{" "}
          <strong className="font-semibold text-[#14142b]">estrategia, usuarios y trabajo con otros equipos</strong>.
        </p>
      </Container>

      {/* ── Scroll track ──────────────────────────────────────────────────────── */}
      <div ref={trackRef} style={{ height: "420dvh" }}>
        <div className="sticky top-0 flex items-center" style={{ height: "100dvh" }}>
          <Container>
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-16">

              {/* ── Left: nav + info ────────────────────────────────────────── */}
              <div className="min-w-0">
                {/* Numbered nav */}
                <ol className="relative mb-9 list-none" aria-label="Etapas">
                  {/* Vertical track line — desktop only */}
                  <span
                    className="pointer-events-none absolute hidden md:block"
                    style={{ left: 15, top: 16, bottom: 16, width: 2, background: "#dcdae8" }}
                    aria-hidden="true"
                  />
                  {/* Fill */}
                  <span
                    className="pointer-events-none absolute hidden md:block"
                    style={{
                      left: 15,
                      top: 16,
                      width: 2,
                      background: "#6f5fd6",
                      height: `calc(${fillPct} * (100% - 32px))`,
                      transition: "height 0.4s ease",
                    }}
                    aria-hidden="true"
                  />

                  {/* On mobile: flex row; on desktop: grid with gap */}
                  <div className="flex flex-wrap gap-1.5 md:grid md:gap-1">
                    {STEPS.map((s, i) => (
                      <li key={s.tab}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-label={`${i + 1}. ${s.tab}`}
                          aria-current={cur === i ? "step" : undefined}
                          className="relative flex cursor-pointer items-center gap-4 border-none bg-transparent py-1 text-left font-manrope text-[17px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f5fd6] focus-visible:rounded-lg"
                          style={{ color: cur === i ? "#14142b" : "#5f5c85" }}
                        >
                          <span
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-[13px] font-bold transition-all duration-200"
                            style={
                              cur === i
                                ? { background: "#6f5fd6", borderColor: "#6f5fd6", color: "#fff", transform: "scale(1.1)" }
                                : i < cur
                                ? { background: "#eeedf5", borderColor: "#6f5fd6", color: "#6f5fd6" }
                                : { background: "#eeedf5", borderColor: "#dcdae8", color: "#5f5c85" }
                            }
                          >
                            {i + 1}
                          </span>
                          <span className="hidden md:inline">{s.tab}</span>
                        </button>
                      </li>
                    ))}
                  </div>
                </ol>

                {/* Info: title + desc */}
                <div
                  aria-live="polite"
                  style={{
                    opacity: infoVisible ? 1 : 0,
                    transform: infoVisible ? "none" : "translateY(8px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <h3
                    className="font-manrope font-extrabold leading-[1.1] tracking-[-0.03em] text-[#14142b]"
                    style={{ fontSize: "clamp(28px, 3.2vw, 42px)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] font-manrope text-[17px] leading-relaxed text-[#5f5c85]">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* ── Right: Terminal ─────────────────────────────────────────── */}
              <div
                className="min-w-0 overflow-hidden rounded-[20px] font-space-mono"
                style={{
                  background: "#191a2e",
                  color: "#e8e6ff",
                  boxShadow: "0 30px 70px -30px rgba(20,20,43,0.55)",
                }}
              >
                {/* Bar */}
                <div
                  className="flex items-center gap-2 border-b px-5 py-3.5 font-manrope text-[13px]"
                  style={{ borderColor: "rgba(255,255,255,0.08)", color: "#8f8cc2" }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="h-[11px] w-[11px] rounded-full"
                      style={{ background: "rgba(255,255,255,0.14)" }}
                    />
                  ))}
                  <span className="ml-2.5">{step.no ? "sin AI" : "claude"}</span>
                </div>

                {/* Body */}
                <div className="min-h-[220px] px-6 py-6 text-[15px] leading-[1.65] md:min-h-[250px] md:text-[15.5px]">
                  {/* Prompt line */}
                  <div>
                    <span
                      className="mr-2.5 font-bold"
                      style={{ color: step.no ? "#7be0a3" : "#a99cf0" }}
                    >
                      {step.no ? "#" : ">"}
                    </span>
                    <span style={{ color: "#fff" }}>{typedText}</span>
                    {isTyping && (
                      <span
                        className="cursor-blink ml-0.5 inline-block"
                        style={{
                          width: 9,
                          height: "1.1em",
                          background: "#a99cf0",
                          verticalAlign: "text-bottom",
                        }}
                      />
                    )}
                  </div>

                  {/* Reply */}
                  {showReply && (
                    <div
                      className="mt-3.5"
                      style={{
                        opacity: 1,
                        transform: "none",
                        transition: "opacity 0.35s ease, transform 0.35s ease",
                      }}
                    >
                      {step.aiText ? (
                        <span style={{ color: "#b9b6e6" }}>{step.aiText}</span>
                      ) : (
                        <span>
                          {step.reply.map((r, i) =>
                            Array.isArray(r) ? (
                              <span
                                key={i}
                                className="mr-2 mt-1 inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-[13.5px]"
                                style={{ borderColor: "rgba(255,255,255,0.16)", color: "#e8e6ff" }}
                              >
                                <span
                                  className="h-[9px] w-[9px] shrink-0 rounded-full"
                                  style={{ background: r[1] }}
                                />
                                {r[0]}
                              </span>
                            ) : (
                              <span
                                key={i}
                                className="mr-2 mt-1 inline-flex items-center gap-2 rounded-full border px-3 py-0.5 text-[13.5px]"
                                style={{ borderColor: "rgba(255,255,255,0.16)", color: "#e8e6ff" }}
                              >
                                <span style={{ color: "#7be0a3" }}>✓</span>
                                {r}
                              </span>
                            )
                          )}
                        </span>
                      )}
                    </div>
                  )}

                  {/* yo decido */}
                  {showDecide && (
                    <div
                      className="mt-3.5"
                      style={{ transition: "opacity 0.35s ease, transform 0.35s ease" }}
                    >
                      <span className="mr-2.5 font-bold" style={{ color: "#7be0a3" }}>✓</span>
                      <span className="font-bold" style={{ color: "#7be0a3" }}>yo decido:</span>{" "}
                      <span style={{ color: "#fff" }}>{step.me[0]}</span>
                    </div>
                  )}
                </div>

                {/* Split footer: La AI / Yo decido */}
                <div
                  className="grid grid-cols-2 font-manrope"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="px-6 py-4 pb-5">
                    <h4
                      className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em]"
                      style={{ color: "#8f8cc2" }}
                    >
                      La AI
                    </h4>
                    <ul className="grid gap-1.5 text-[14.5px] leading-[1.4]" style={{ color: "#d6d3f5", listStyle: "none" }}>
                      {step.ai.map((item, i) => (
                        <li key={i}>
                          <span className="mr-2" style={{ color: "#6e6aa3" }}>–</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="px-6 py-4 pb-5"
                    style={{
                      borderLeft: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(169,156,240,0.08)",
                    }}
                  >
                    <h4
                      className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em]"
                      style={{ color: "#a99cf0" }}
                    >
                      Yo decido
                    </h4>
                    <ul className="grid gap-1.5 text-[14.5px] leading-[1.4]" style={{ color: "#d6d3f5", listStyle: "none" }}>
                      {step.me.map((item, i) => (
                        <li key={i}>
                          <span className="mr-2" style={{ color: "#a99cf0" }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </div>
      </div>

      {/* Spacer after track */}
      <div style={{ height: "21vh" }} />
    </div>
  );
}
