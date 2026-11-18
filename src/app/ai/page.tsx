import type { Metadata } from "next";
import MiProceso from "@/components/MiProceso";
import ComoUsoAI from "@/components/ai/ComoUsoAI";
import Contacto from "@/components/Contacto";

export const metadata: Metadata = {
  title: "AI · Moira Andreoli",
};

export default function AIPage() {
  return (
    <div className="min-h-screen bg-[#eeedf5]">
      <MiProceso />
      <ComoUsoAI />
      <Contacto />
    </div>
  );
}
