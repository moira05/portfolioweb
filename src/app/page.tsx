import Hero from "@/components/Hero";
import Proyectos from "@/components/Proyectos";
import Playground from "@/components/Playground";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Proyectos />
      <Playground />
      <Contacto />
      <Footer />
    </main>
  );
}
