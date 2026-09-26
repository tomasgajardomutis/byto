import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { PortfolioSection } from "@/components/PortfolioSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { projectsQuery } from "@/lib/content";

const title = "Proyectos | Byto";
const description = "Conoce proyectos de desarrollo web, e-commerce y soluciones digitales creadas por Byto.";

export const Route = createFileRoute("/proyectos")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(projectsQuery);
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/proyectos" },
    ],
    links: [{ rel: "canonical", href: "/proyectos" }],
  }),
  component: ProyectosPage,
});

function ProyectosPage() {
  return (
    <>
      <AuroraBackground />
      <CursorHalo />
      <Navbar />
      <main className="pt-20">
        <PortfolioSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
