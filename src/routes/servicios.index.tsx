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

const title = "Desarrollo Web, Diseño Web, E-commerce y SEO en Chile | Byto";
const description = "Servicios de desarrollo web en Chile: páginas web profesionales, diseño web, tiendas online, aplicaciones a medida, SEO y Google Business para empresas y pymes.";
const serviceLinks = [
  { title: "Desarrollo Web", description: "Sitios rápidos, responsivos y preparados para convertir visitas en oportunidades.", href: "/servicios/desarrollo-web" },
  { title: "Tiendas Online", description: "E-commerce diseñado para ofrecer una experiencia de compra clara y facilitar tus ventas digitales.", href: "/servicios/tiendas-online" },
  { title: "Aplicaciones Web", description: "Software a medida para automatizar procesos y construir herramientas adaptadas a tu operación.", href: "/servicios/aplicaciones-web" },
  { title: "SEO", description: "Optimización técnica y de contenido para aumentar la visibilidad de tu sitio en búsquedas relevantes.", href: "/servicios/seo" },
  { title: "Google Business", description: "Optimización de tu Perfil de Empresa para fortalecer tu presencia en Google y Google Maps.", href: "/servicios/google-business" },
];

export const Route = createFileRoute("/servicios/")({
  loader: async ({ context }) => { await context.queryClient.ensureQueryData(servicesQuery); },
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:locale", content: "es_CL" }], links: [{ rel: "canonical", href: "https://byto.cl/servicios" }] }),
  component: ServiciosPage,
});

function ServiciosPage() {
  return <><AuroraBackground /><CursorHalo /><Navbar /><main>
    <section className="px-5 pb-8 pt-32 md:pt-40"><div className="mx-auto max-w-6xl"><Reveal><p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">Servicios digitales</p><h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">Desarrollo web, diseño de páginas web y SEO para empresas en Chile</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">En Byto desarrollamos páginas web profesionales, tiendas online y aplicaciones web para empresas, pymes y emprendimientos en Chile. Combinamos diseño web UX/UI, desarrollo a medida, SEO técnico, rendimiento y analítica para crear sitios que comuniquen mejor tus servicios y ayuden a generar oportunidades comerciales.</p><a href={whatsappLink("Hola Byto, quiero saber qué servicio es el adecuado para mi proyecto.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3 font-semibold text-background"><MessageCircle className="h-5 w-5" /> Cuéntanos tu proyecto</a></Reveal></div></section>
    <ServicesSection />
    <section className="px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><Reveal><p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">Explora cada solución</p><h2 className="mt-3 max-w-3xl font-display text-3xl font-bold md:text-4xl">Servicios web según el objetivo de tu empresa</h2></Reveal><div className="mt-10 grid gap-4 md:grid-cols-2">{serviceLinks.map((s,i)=><Reveal key={s.href} delay={i*50} className="glass-panel aurora-border rounded-3xl p-6"><h3 className="font-display text-xl font-semibold">{s.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p><a href={s.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ver servicio <ArrowRight className="h-4 w-4" /></a></Reveal>)}</div></div></section>
    <ProcessSection />
    <section className="px-5 py-20"><Reveal className="aurora-border glass-panel mx-auto max-w-4xl rounded-3xl p-8 text-center md:p-12"><h2 className="font-display text-3xl font-bold">¿No sabes qué solución necesitas?</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Cuéntanos qué quieres lograr y te ayudamos a definir la solución adecuada.</p><a href="/contacto" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3 font-semibold text-background">Conversemos <ArrowRight className="h-4 w-4" /></a></Reveal></section>
  </main><Footer /><WhatsAppFab /></>;
}
