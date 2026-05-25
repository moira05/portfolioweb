import Image from "next/image";

const tools = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma" },
  { src: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/v0.png", alt: "v0" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/1024px-Claude_AI_logo.svg.png", alt: "Claude" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png", alt: "ChatGPT" },
  { src: "https://mobbin.com/favicon.ico", alt: "Mobbin" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", alt: "Notion" },
];

function WavyUnderline() {
  return (
    <svg
      viewBox="0 0 300 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[300px]"
      aria-hidden="true"
    >
      <path
        d="M2 7 C 35 2, 70 12, 105 7 S 175 2, 210 7 S 265 12, 298 7"
        stroke="#b0aaf2"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function CoWorkers() {
  return (
    <section className="bg-white px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-screen-xl">
        {/* Two-column layout */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-20">
          {/* Left: title */}
          <div className="flex w-full shrink-0 flex-col gap-4 md:w-[340px]">
            <Image
              src="/robot.svg"
              alt="Robot AI"
              width={65}
              height={65}
              className="object-contain"
            />
            <div className="flex flex-col gap-1">
              <h2 className="font-manrope text-[2rem] font-semibold tracking-[0.4px] text-black md:text-[3rem]">
                Mi stack
              </h2>
              <WavyUnderline />
            </div>
          </div>

          {/* Right: paragraphs */}
          <div className="flex flex-col gap-6 md:gap-8">
            <p className="font-manrope text-[1rem] font-normal leading-snug text-black md:text-[1.5rem]">
              <strong className="font-bold">Con la idea, el problema a resolver</strong>
              {", y con el entendimiento sobre cómo lo otros resuelven. Desde ahí empiezo a bajar los lineamientos junto a mi co worker "}
              <strong className="font-bold">Chat GPT.</strong>
              {" Exploramos opciones, discutimos alternativas y transformamos la idea en los primeros bocetos."}
            </p>

            <p className="font-manrope text-[1rem] font-normal leading-snug text-black md:text-[1.5rem]">
              <strong className="font-bold">Para explorar diferentes versiones</strong>
              {", utilizo "}
              <strong className="font-bold">v0</strong>
              {" y Stitch. Hago un benchmark visual en Mobbin para ver qué formas hay para resolver un mismo problema visual."}
            </p>

            <p className="font-manrope text-[1rem] font-normal leading-snug text-black md:text-[1.5rem]">
              <strong className="font-bold">Con Claude pulimos la idea final, </strong>
              {"analizando consistencia, accesibilidad y facilidad de uso. Y llevamos a las personas usuarias esta versión final para probar con humanos."}
            </p>
          </div>
        </div>

        {/* Tool logos row */}
        <div className="mt-10 grid grid-cols-6 gap-3 md:mt-16 md:flex md:items-center md:justify-between md:gap-0 md:px-4">
          {tools.map((tool) => (
            <div
              key={tool.alt}
              className="flex items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.1)] overflow-hidden aspect-square w-full md:w-[102px] md:h-[102px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.src}
                alt={tool.alt}
                className="size-full rounded-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
