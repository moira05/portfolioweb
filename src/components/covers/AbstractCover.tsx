import Image from "next/image";

export default function AbstractCover() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#eeedf5]">
      {/* Background icons, offset and faded */}
      <div className="absolute left-6 top-8 opacity-15 rotate-[-12deg]">
        <Image src="/magic-bunny.svg" alt="" width={70} height={70} aria-hidden="true" />
      </div>
      <div className="absolute right-8 bottom-6 opacity-15 rotate-[18deg]">
        <Image src="/star.svg" alt="" width={55} height={55} aria-hidden="true" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <Image src="/nodos.svg" alt="" width={90} height={90} aria-hidden="true" />
      </div>

      {/* Center dot grid — purely decorative */}
      <div className="grid grid-cols-5 gap-3 opacity-30">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="size-1.5 rounded-full bg-[#b0aaf2]"
            style={{ opacity: 0.4 + (i % 3) * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
