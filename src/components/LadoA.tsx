"use client";

import Image from "next/image";
import { useState } from "react";
import DrawUnderline from "./DrawUnderline";

const LADO_A = [
  {
    icon: "/robot.svg",
    iconAlt: "Robot AI",
    titleSerif: "AI",
    titleSans: "Design",
    description: [
      "Analizo mi proceso para detectar dónde la AI puede optimizarlo.",
      "Trabajo desde la experimentación: pruebo, ajusto y decido qué sumar y qué dejar afuera.",
      "Me enfoco en acelerar procesos sin comprometer la calidad del resultado.",
    ],
  },
  {
    icon: "/nodos.svg",
    iconAlt: "Nodos",
    titleSerif: "Critical",
    titleSans: "Thinking",
    description: [
      "Transformo problemas complejos en decisiones claras.",
      "Uso OKRs para priorizar y asegurar que cada decisión tenga impacto real.",
      "Cuestiono supuestos y diseño con intención.",
    ],
  },
  {
    icon: "/magic-bunny.svg",
    iconAlt: "Magic bunny",
    titleSerif: "Product",
    titleSans: "Design",
    description: [
      "Empiezo por escuchar lo que cada parte necesita, sin ego y sin supuestos.",
      "Después enfoco lo importante y le doy dirección.",
      "Conecto necesidades de usuarios, negocio y tecnología para construir productos claros y valiosos.",
    ],
  },
];

const LADO_B = [
  {
    icon: "/star.svg",
    iconAlt: "Estrella",
    title: "Turista",
    description: [
      "Observar, conocer, encontrar excusas para vivir pequeños momentos de vacaciones.",
      "A veces una tarde, a veces un poco más.",
      "Mirar el mundo desde la curiosidad atenta.",
    ],
  },
  {
    icon: "/helado.svg",
    iconAlt: "Helado",
    title: "Creatividad",
    description: [
      "Me gustan los espacios donde no hay un objetivo inmediato que cumplir, solo explorar.",
      "Ahí aparecen las ideas.",
      "Pintar, escribir poesía, improvisar en teatro.",
    ],
  },
  {
    icon: "/goal.svg",
    iconAlt: "Movimiento",
    title: "Movimiento",
    description: [
      "Corro para ordenar lo que pienso.",
      "En la montaña y en el movimiento encuentro foco, regulación y perspectiva.",
      "También es una forma de volver al cuerpo.",
    ],
  },
];


export default function LadoA() {
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="lado-a" className="bg-[#eeedf5] px-10 py-16">
      <div className="mx-auto max-w-screen-xl">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div className="flex flex-col gap-1 w-fit">
            <h2 className="font-manrope text-[2rem] font-semibold tracking-[0.4px] text-black md:text-[3rem]">
              {flipped ? "Mi lado B" : "Mi lado A"}
            </h2>
            <DrawUnderline />
          </div>
          <button
            onClick={() => setFlipped((f) => !f)}
            className="font-manrope text-[1.5rem] font-normal text-black underline decoration-solid hover:opacity-60 transition-opacity cursor-pointer"
          >
            {flipped ? "Ir al lado A" : "Ir al lado B"}
          </button>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {LADO_A.map((a, i) => {
            const b = LADO_B[i];
            return (
              <div
                key={a.titleSans}
                style={{ perspective: "1000px" }}
                className="md:h-[420px]"
              >
                <div
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: `transform 0.6s ease ${i * 0.1}s`,
                    position: "relative",
                    width: "100%",
                  }}
                  className="h-auto md:h-full"
                >
                  {/* Front — Lado A */}
                  <div
                    style={{ backfaceVisibility: "hidden" }}
                    className={`relative flex-col gap-3 rounded-[29px] bg-white px-8 py-8 md:absolute md:inset-0 md:flex md:px-10 md:py-10 ${flipped ? "hidden" : "flex"}`}
                  >
                    <Image
                      src={a.icon}
                      alt={a.iconAlt}
                      width={65}
                      height={65}
                      className="object-contain"
                    />
                    <h3 className="text-[1.5rem] font-semibold leading-[1.1] text-black md:text-[2.375rem]">
                      <span className="font-vollkorn italic">{a.titleSerif} </span>
                      <span className="font-manrope">{a.titleSans}</span>
                    </h3>
                    <div className="flex flex-col gap-3">
                      {a.description.map((line, idx) => (
                        <p key={idx} className="font-manrope text-[0.95rem] font-normal leading-[1.5] text-[#2d2d2d] md:text-[1.125rem]">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Back — Lado B */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className={`relative flex-col gap-3 rounded-[29px] bg-white px-8 py-8 md:absolute md:inset-0 md:flex md:px-10 md:py-10 ${flipped ? "flex" : "hidden"}`}
                  >
                    <Image
                      src={b.icon}
                      alt={b.iconAlt}
                      width={65}
                      height={65}
                      className="object-contain"
                    />
                    <h3 className="font-vollkorn text-[1.5rem] italic font-semibold leading-[1.1] text-black md:text-[2.375rem]">
                      {b.title}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {b.description.map((line, idx) => (
                        <p key={idx} className="font-manrope text-[0.95rem] font-normal leading-[1.5] text-[#2d2d2d] md:text-[1.125rem]">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
