import type { Metadata } from "next";
import LadoA from "@/components/LadoA";
import Experiencia from "@/components/Experiencia";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sobre mí · Moira Andreoli",
};

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-[#eeedf5]">
      <LadoA />
      <Experiencia />
      <Contacto />
      <Footer />
    </div>
  );
}
