import { useQuery } from "@tanstack/react-query";
import { stylesQuery } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StylePreview } from "@/components/StylePreview";

const easeTone: Record<string, string> = {
  Excelente: "text-neon",
  Buena: "text-primary",
  Regular: "text-[oklch(0.8_0.16_75)]",
  Baja: "text-destructive",
};

export function StylesSection() {
  const { data: styles = [] } = useQuery(stylesQuery);

  return (
    <section id="estilos" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Estilos visuales"
          title="Elige el look que mejor vende tu marca"
          subtitle="Cada estilo comunica algo distinto. Esta guía te ayuda a decidir con criterio comercial, no solo estético."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((style, i) => (
            <Reveal
              key={style.id}
              delay={i * 50}
              className="aurora-border glass-panel flex h-full flex-col rounded-3xl p-5"
            >
              {style.image_url ? (
                <img
                  src={style.image_url}
                  alt={`Referencia del estilo ${style.name}`}
                  loading="lazy"
                  className="preview-base w-full object-cover"
                />
              ) : (
                <StylePreview previewKey={style.preview_key} />
              )}

              <h3 className="mt-5 font-display text-xl font-semibold">{style.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{style.feeling}</p>

              <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
                <div>
                  <dt className="text-xs tracking-wider text-primary uppercase">Ideal para</dt>
                  <dd className="mt-1 text-muted-foreground">{style.ideal_business}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-wider text-primary uppercase">
                    Ventaja comercial
                  </dt>
                  <dd className="mt-1 text-muted-foreground">{style.commercial_advantage}</dd>
                </div>
              </dl>

              <p className="mt-5 text-sm">
                <span className="text-muted-foreground">Facilidad de uso: </span>
                <span className={`font-semibold ${easeTone[style.ease_level] ?? "text-primary"}`}>
                  {style.ease_level}
                </span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
