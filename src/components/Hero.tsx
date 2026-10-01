import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section id="top" className="relative px-5 pt-28 pb-16 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Estudio de desarrollo web en {SITE.city}
        </span>

        <h1 className="mt-7 font-display text-[2.6rem] leading-[1.05] font-bold sm:text-6xl md:text-7xl">
          Webs rápidas que <span className="text-aurora">venden</span> mientras duermes
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
          En Byto diseño y programo sitios, tiendas y aplicaciones web a medida, optimizados para
          celular y para aparecer primero en Google.
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <a
            href={whatsappLink("Hola Byto, quiero lanzar mi proyecto web. ¿Conversamos?")}
            target="_blank"
            rel="noreferrer"
            className="glow-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-aurora)] px-7 py-4 font-display text-base font-bold text-background transition-transform active:scale-95 sm:text-lg"
          >
            Lanza tu proyecto
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="#portafolio"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface/60 px-7 py-4 font-display text-base font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/60 sm:text-lg"
          >
            Ver trabajos
          </a>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3 text-center">
          {[
            { k: "100%", v: "Mobile-first" },
            { k: "<1s", v: "Carga objetivo" },
            { k: "SEO", v: "Desde el día 1" },
          ].map((s) => (
            <div key={s.v} className="glass-panel rounded-2xl px-2 py-5">
              <dt className="font-display text-2xl font-bold text-aurora sm:text-3xl">{s.k}</dt>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-neon" />
          Respuesta por WhatsApp el mismo día
        </p>
      </div>
    </section>
  );
}
