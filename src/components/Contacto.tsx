"use client";

import { useState } from "react";

const EMAIL = "andreolimoira@gmail.com";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5V9.5A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Contacto() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#eeedf5] px-10 py-16">
      <div className="mx-auto max-w-screen-xl">
        <h2 className="font-vollkorn text-[2rem] italic font-normal leading-tight text-black mb-4 md:text-[3rem]">
          ¿Querés explorar algo?
        </h2>
        <p className="font-manrope text-[1rem] font-normal leading-relaxed text-[#2d2d2d] max-w-[680px] mb-10 md:text-[1.25rem]">
          Me interesan los proyectos donde haya un problema real para resolver, especialmente donde la IA pueda ser parte de la solución. Si tenés una idea, un experimento o algo para probar — escribime.
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
          <a
            href="https://www.linkedin.com/in/moiraandreoli/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-manrope text-[1rem] font-normal text-black hover:opacity-60 transition-opacity"
          >
            Linkedin
            <ExternalArrow />
          </a>

          <a
            href="https://medium.com/@moirixand"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-manrope text-[1rem] font-normal text-black hover:opacity-60 transition-opacity"
          >
            Medium
            <ExternalArrow />
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 font-manrope text-[0.8rem] font-normal text-black hover:opacity-60 transition-opacity cursor-pointer md:text-[1rem]"
          >
            {EMAIL}
            <span className={copied ? "text-green-600" : "text-black"}>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
