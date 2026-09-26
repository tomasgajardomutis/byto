import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal } from "@/components/Reveal";
import { servicesQuery } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

const title = "Servicios de Desarrollo Web, E-commerce y SEO en Chile | Byto";
const description = "Servicios digitales para empresas y emprendimientos en Chile: desarrollo web, tiendas online, aplicaciones web, SEO y optimización de Google Business Profile.";

const serviceLinks = [
  { title: "Desarrollo Web", description: "Sitios rápidos, responsivos y preparados para convertir visitas en oportunidades.", href: "/servicios/desarrollo-web" },
  { title: "Tiendas Online", description: "E-commerce diseñado para ofrecer una experiencia de compra clara y facilitar tus ventas digitales.", href: "/servicios/tiendas-online" },
  { title: "Aplicaciones Web", description: "Software a medida para automatizar procesos y construir herramientas adaptadas a tu operación.", href: "/servicios/aplicaciones-web" },
  { title: "SEO", description: "Optimización técnica y de contenido para aumentar la visibilidad de tu sitio en búsquedas relevantes.", href: "/servicios/seo" },
  { title: "Google Business", description: "Optimización de tu Perfil de Empresa para fortalecer tu presencia en Google y Google Maps.", href: "/servicios/google-business" },
];

export const Route = createFileRoute("/servicios")({
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(servicesQuery); },
  head: () => ({
    meta: [
      { title }, { name: "description", content: description },
      { name: "keywords", content: "desarrollo web Chile, tiendas online Chile, e-commerce, aplicaciones web, SEO Chile, Google Business Profile" },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: "/servicios" }, { property: "og:locale", content: "es_CL" },
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
      <main>
        <section className="px-5 pb-8 pt-32 md:pt-40">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">Servicios digitales</p>
              <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">Tecnología para hacer crecer tu negocio en internet</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">En Byto diseñamos y desarrollamos soluciones digitales para empresas y emprendimientos en Chile. Desde un sitio web profesional hasta una tienda online, una aplicación a medida o una estrategia técnica para mejorar tu presencia en Google.</p>
              <a href={whatsappLink("Hola Byto, quiero saber qué servicio es el adecuado para mi proyecto.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"><MessageCircle className="h-5 w-5" /> Cuéntanos tu proyecto</a>
            </Reveal>
          </div>
        </section>

        <ServicesSection />

        <section className="px-5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">Explora cada solución</p>
              <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold md:text-4xl">Elige el servicio según el objetivo de tu negocio</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Cada proyecto necesita una combinación diferente de diseño, desarrollo y posicionamiento. Revisa en detalle qué podemos construir contigo.</p>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {serviceLinks.map((service, index) => (
                <Reveal key={service.href} delay={index * 50} className="glass-panel aurora-border rounded-3xl p-6">
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <a href={service.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3">Ver servicio <ArrowRight className="h-4 w-4" /></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />

        <section className="px-5 py-20">
          <Reveal className="aurora-border glass-panel mx-auto max-w-4xl rounded-3xl p-8 text-center md:p-12">
            <h2 className="font-display text-3xl font-bold">¿No sabes qué solución necesitas?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Cuéntanos qué quieres lograr. Podemos ayudarte a definir si necesitas un sitio, una tienda online, una aplicación o mejorar la presencia digital que ya tienes.</p>
            <a href="/contacto" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3 font-semibold text-background">Conversemos <ArrowRight className="h-4 w-4" /></a>
          </Reveal>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
