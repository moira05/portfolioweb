import type { Metadata } from "next";
import LadoA from "@/components/LadoA";
import MiProceso from "@/components/MiProceso";

export const metadata: Metadata = {
  title: "Sobre mí · Moira Andreoli",
};

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-[#eeedf5]">
      <LadoA />
      <MiProceso />
    </div>
  );
}
