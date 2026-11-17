import Container from "./Container";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-white pb-10">
      <Container className="border-t border-[#4b5563]/20 pt-6 flex items-center justify-between">
        <p className="font-manrope text-[0.85rem] text-[#4b5563]">
          Hecho con ♥ y con AI
        </p>
        <p className="font-manrope text-[0.85rem] text-[#4b5563]">
          © 2026
        </p>
      </Container>
    </footer>
  );
}
