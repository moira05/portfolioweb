"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import DrawUnderline from "./DrawUnderline";

function ExternalArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 13L13 3M13 3H6M13 3V10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DELAYS = [0, 150, 300];

export default function Proyectos() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, DELAYS[i]);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(card);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="proyectos" className="bg-[#eeedf5] px-10 py-16">
      <div className="mx-auto max-w-screen-xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-1 w-fit">
          <h2 className="font-manrope text-[2rem] font-semibold tracking-[0.4px] text-black md:text-[3rem]">
            Proyectos
          </h2>
          <DrawUnderline />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Card 1 — KYC Prueba de vida */}
          <div
            ref={(el) => { cardRefs.current[0] = el; }}
            className="group relative flex h-[552px] cursor-pointer flex-col overflow-hidden rounded-[29px] bg-[#1a1a2e]"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            {/* Image */}
            <div className="relative h-[55%] w-full shrink-0 overflow-hidden">
              <Image
                src="/kyc.png"
                alt="KYC Prueba de vida"
                fill
                className="object-cover object-top"
              />
              {/* Coming soon badge */}
              <span className="absolute left-4 top-4 rounded-full bg-[#b0aaf2] px-3 py-1 font-manrope text-[0.75rem] font-semibold text-black">
                Coming soon
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex flex-col gap-2">
                {/* Categories */}
                <div className="flex gap-2">
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">Design Process</span>
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">·</span>
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">UX AI</span>
                </div>
                {/* Title */}
                <h3 className="font-manrope text-[1.6rem] font-bold leading-tight text-white">
                  KYC Prueba de vida
                </h3>
                {/* Description */}
                <p className="font-manrope text-[0.85rem] font-normal leading-relaxed text-white/70">
                  Mejora del flujo detectando inconsistencias en los mensajes de error y requisitos no visibles para el usuario.
                </p>
              </div>
              {/* Role */}
              <p className="font-manrope text-[0.78rem] font-medium text-white/40">UX Research · UI Design</p>
            </div>
          </div>

          {/* Card 2 — Defensa de Contracargo */}
          <div
            ref={(el) => { cardRefs.current[1] = el; }}
            className="group relative flex h-[552px] cursor-pointer flex-col overflow-hidden rounded-[29px] bg-[#1a1a2e]"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            {/* Image */}
            <div className="relative h-[55%] w-full shrink-0 overflow-hidden">
              <Image
                src="/contracargo.png"
                alt="Defensa de Contracargo"
                fill
                className="object-cover object-top"
              />
              {/* Coming soon badge */}
              <span className="absolute left-4 top-4 rounded-full bg-[#b0aaf2] px-3 py-1 font-manrope text-[0.75rem] font-semibold text-black">
                Coming soon
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex flex-col gap-2">
                {/* Categories */}
                <div className="flex gap-2">
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">Design Process</span>
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">·</span>
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">UX AI</span>
                </div>
                {/* Title */}
                <h3 className="font-manrope text-[1.6rem] font-bold leading-tight text-white">
                  Defensa de Contracargo
                </h3>
                {/* Description */}
                <p className="font-manrope text-[0.85rem] font-normal leading-relaxed text-white/70">
                  Diseño de experiencia eficiente para merchants con alto volumen de casos de contracargo.
                </p>
              </div>
              {/* Role */}
              <p className="font-manrope text-[0.78rem] font-medium text-white/40">UX Research · UI Design</p>
            </div>
          </div>

          {/* Card 3 — Web para estudio de arquitectura */}
          <div
            ref={(el) => { cardRefs.current[2] = el; }}
            className="group relative flex h-[552px] cursor-pointer flex-col overflow-hidden rounded-[29px] bg-[#1a1a2e]"
            style={{ opacity: 0, transform: "translateY(20px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            {/* Image with hover overlay */}
            <div className="relative h-[55%] w-full shrink-0 overflow-hidden">
              <Image
                src="/constructora.png"
                alt="Web para estudio de arquitectura"
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Link
                  href="https://www.afdesarrollos.com.ar/"
                  className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-manrope text-[0.9rem] font-semibold text-black transition-transform duration-200 hover:scale-105"
                >
                  Ver proyecto
                  <ExternalArrow />
                </Link>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex flex-col gap-2">
                {/* Categories */}
                <div className="flex gap-2">
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">Diseño web</span>
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">·</span>
                  <span className="font-manrope text-[0.75rem] font-semibold uppercase tracking-wider text-[#b0aaf2]">IA</span>
                </div>
                {/* Title */}
                <h3 className="font-manrope text-[1.6rem] font-bold leading-tight text-white">
                  Web para estudio de arquitectura
                </h3>
                {/* Description */}
                <p className="font-manrope text-[0.85rem] font-normal leading-relaxed text-white/70">
                  Diseño y desarrollo del sitio web con herramientas de IA, listo para publicar.
                </p>
              </div>
              {/* Role */}
              <p className="font-manrope text-[0.78rem] font-medium text-white/40">Diseño web · IA</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
