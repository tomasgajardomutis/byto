import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StylesSection } from "@/components/StylesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { servicesQuery, projectsQuery, stylesQuery } from "@/lib/content";
import { SITE } from "@/lib/site";

const title = "Byto | Desarrollo web, e-commerce y SEO en Chile";
const description =
  "Byto crea sitios web, tiendas online y aplicaciones a medida: rápidos, mobile-first y optimizados para posicionar tu negocio en Google.";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(servicesQuery),
      context.queryClient.ensureQueryData(projectsQuery),
      context.queryClient.ensureQueryData(stylesQuery),
    ]);
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "desarrollo web Chile, diseño web Santiago, tiendas online, SEO, aplicaciones web, Google Business Profile",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "es_CL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Byto",
          description,
          areaServed: "Chile",
          address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
          telephone: `+${SITE.whatsappNumber}`,
          email: SITE.email,
          serviceType: [
            "Desarrollo Web",
            "E-commerce",
            "Posicionamiento Web SEO",
            "Aplicaciones Web",
            "Optimización de Ficha de Google Business",
          ],
        }),
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      <AuroraBackground />
      <CursorHalo />
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <StylesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
