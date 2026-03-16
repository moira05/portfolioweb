
function WavyUnderline() {
  return (
    <svg
      viewBox="0 0 520 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px]"
      aria-hidden="true"
    >
      <path
        d="M2 9 C 43 2, 87 16, 130 9 S 217 2, 260 9 S 347 16, 390 9 S 477 2, 518 9"
        stroke="#b0aaf2"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Mindset() {
  return (
    <section className="bg-[#eeedf5] px-10">
      {/* Text content */}
      <div className="mx-auto max-w-screen-xl py-20">
        {/* Heading */}
        <div className="mb-4">
          <h2 className="font-vollkorn text-[2rem] font-normal leading-[1.1] text-black md:text-[4.5rem] md:leading-[0.92]">
            No se trata solo de una disciplina
            <br />
            <em className="italic">es una forma de ver el mundo.</em>
          </h2>
          <div className="mt-3">
            <WavyUnderline />
          </div>
        </div>

        {/* Body */}
        <div className="mt-10 flex flex-col gap-8 max-w-full md:max-w-[70%]">
          <p className="font-manrope text-[1rem] font-normal leading-snug text-black md:text-[2rem]">
            Hay algo mágico en observar como las personas interactúan con el
            espacio, con la tecnología y con los objetos.
          </p>
          <p className="font-manrope text-[1rem] font-normal leading-snug text-black md:text-[2rem]">
            Valoro la claridad, el significado y funcionalidad.
          </p>
        </div>
      </div>
    </section>
  );
}
