import Image from "next/image";
import DrawUnderline from "./DrawUnderline";

export default function PensamientosIntro() {
  return (
    <section className="bg-[#eeedf5] px-10 py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center">
        {/* Line 1: "Diseño" + inline gif */}
        <div className="flex items-center gap-6">
          <span className="font-vollkorn text-[4.48rem] font-normal leading-none text-black">
            Diseño
          </span>
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/footer.gif"
              alt=""
              width={150}
              height={185}
              className="h-[185px] w-[150px] object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Line 2: "con propósito" + animated underline */}
        <div className="flex flex-col items-center">
          <span className="font-vollkorn text-[4.48rem] font-normal leading-none text-black">
            con propósito
          </span>
          <DrawUnderline />
        </div>
      </div>
    </section>
  );
}
