import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Code2, ShoppingCart, Search, Layers, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { servicesQuery } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const icons: Record<string, typeof Code2> = { code: Code2, cart: ShoppingCart, search: Search, layers: Layers, mappin: MapPin, sparkles: Sparkles };

function getServiceRoute(title: string) {
  const normalized = title.trim().toLocaleLowerCase("es-CL");
  if (normalized.includes("desarrollo web")) return "/servicios/desarrollo-web";
  if (normalized.includes("e-commerce") || normalized.includes("ecommerce") || normalized.includes("tienda")) return "/servicios/tiendas-online";
  if (normalized.includes("aplicacion") || normalized.includes("aplicación")) return "/servicios/aplicaciones-web";
  if (normalized.includes("seo") || normalized.includes("posicionamiento")) return "/servicios/seo";
  if (normalized.includes("google business") || normalized.includes("ficha de google")) return "/servicios/google-business";
  return null;
}

export function ServicesSection() {
  const { data: services = [] } = useQuery(servicesQuery);
  return (
    <section id="servicios" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Servicios" title="Todo lo que tu negocio necesita en la web" subtitle="Diseño, desarrollo y posicionamiento para construir una presencia digital sólida." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon] ?? Sparkles;
            const href = getServiceRoute(service.title);
            const content = <><div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-aurora)] text-background"><Icon className="h-6 w-6" /></div><h3 className="mt-5 font-display text-xl font-semibold">{service.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>{href && <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">Conocer servicio <ArrowRight className="h-4 w-4" /></span>}</>;
            return (
              <Reveal key={service.id} delay={i * 60}>
                {href ? <Link to={href} className="aurora-border glass-panel group block h-full cursor-pointer rounded-3xl p-6 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{content}</Link> : <div className="aurora-border glass-panel h-full rounded-3xl p-6">{content}</div>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
