import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const title = "Contacto | Byto";
const description = "Conversemos sobre tu próximo sitio web, tienda online, aplicación o estrategia SEO con Byto.";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <>
      <AuroraBackground />
      <CursorHalo />
      <Navbar />
      <main className="pt-20">
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
