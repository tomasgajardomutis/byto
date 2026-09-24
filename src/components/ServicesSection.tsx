import { useQuery } from "@tanstack/react-query";
import { Code2, ShoppingCart, Search, Layers, MapPin, Sparkles } from "lucide-react";
import { servicesQuery } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const icons: Record<string, typeof Code2> = {
  code: Code2,
  cart: ShoppingCart,
  search: Search,
  layers: Layers,
  mappin: MapPin,
  sparkles: Sparkles,
};

export function ServicesSection() {
  const { data: services = [] } = useQuery(servicesQuery);

  return (
    <section id="servicios" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Servicios"
          title="Todo lo que tu negocio necesita en la web"
          subtitle="Desde la primera línea de código hasta el primer lugar en Google."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon] ?? Sparkles;
            return (
              <Reveal
                key={service.id}
                delay={i * 60}
                className="aurora-border glass-panel group rounded-3xl p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-aurora)] text-background">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
