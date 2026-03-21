import Image from "next/image";
import ParticleBackground from "./ParticleBackground";

const iconRows = [
  [
    { src: "/robot.svg", alt: "Robot AI" },
    { src: "/nodos.svg", alt: "Nodos" },
    { src: "/magic-bunny.svg", alt: "Magic bunny" },
  ],
  [
    { src: "/star.svg", alt: "Star" },
    { src: "/helado.svg", alt: "Helado" },
    { src: "/goal.svg", alt: "Goal" },
  ],
];


function SparkIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="-rotate-[44deg]"
      aria-hidden="true"
    >
      <polyline
        points="0,16 5,4 10,16 15,4 20,16"
        stroke="#c026d3"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden bg-[#eeedf5] px-10 py-16">
      <ParticleBackground />
      <div className="relative z-10 mx-auto flex max-w-screen-xl flex-col-reverse gap-10 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-16">
        {/* Text content */}
        <div className="flex flex-col gap-10 min-w-0">
          {/* Subtitle */}
          <div className="flex items-center gap-4">
            <p className="font-manrope text-[1rem] font-normal text-black md:text-[1.3rem]">
              Hola! <span className="animate-wave">👋</span> Soy Moira, Product{" "}
              <span className="font-vollkorn">Designer</span>
            </p>
          </div>

          {/* Main heading */}
          <div>
            <h1 className="font-vollkorn text-[4rem] font-normal leading-[0.85] tracking-tight text-black -ml-[3px] md:text-[6.5rem]">
              Diseño
              <br />
              con{" "}
              <em className="italic">propósito.</em>
            </h1>
          </div>

          {/* Description */}
          <div className="flex items-start gap-4">
            <p className="font-manrope text-[1rem] font-normal leading-snug text-black md:text-[1.4rem] md:max-w-[560px]">
              En cada interacción, en cada detalle, hay una razón.{" "}
              <strong className="font-bold">
                Para que sea más fácil de usar, más claro de entender, y para que mueva los números que importan, sin perder de vista a las personas.
              </strong>
            </p>
          </div>
        </div>

        {/* Icon grid 3×2 */}
        <div className="grid grid-cols-3 gap-8">
          {iconRows.flat().map((icon) => (
            <div key={icon.alt} className="size-[65px] overflow-hidden">
              <Image
                src={icon.src}
                alt={icon.alt}
                width={65}
                height={65}
                className="size-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
