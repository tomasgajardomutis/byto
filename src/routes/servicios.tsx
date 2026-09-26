import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { servicesQuery } from "@/lib/content";

const title = "Servicios de desarrollo web | Byto";
const description = "Desarrollo web, e-commerce, aplicaciones y SEO para empresas y emprendimientos en Chile.";

export const Route = createFileRoute("/servicios")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(servicesQuery);
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/servicios" },
    ],
    links: [{ rel: "canonical", href: "/servicios" }],
  }),
  component: ServiciosPage,
});

function ServiciosPage() {
  return (
    <>
      <AuroraBackground />
      <CursorHalo />
      <Navbar />
      <main className="pt-20">
        <ServicesSection />
        <ProcessSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
