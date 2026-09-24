import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    n: "01",
    title: "Conversamos",
    text: "Una llamada corta para entender tu negocio, tus clientes y qué necesitas lograr.",
  },
  {
    n: "02",
    title: "Propuesta y diseño",
    text: "Te muestro la estructura y el estilo visual antes de escribir una sola línea de código.",
  },
  {
    n: "03",
    title: "Desarrollo",
    text: "Construyo tu sitio con foco en velocidad, celular y buenas prácticas de SEO.",
  },
  {
    n: "04",
    title: "Lanzamiento y soporte",
    text: "Publicamos, medimos resultados y ajustamos. Quedas con todo bajo tu control.",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo trabajamos juntos"
          subtitle="Cuatro pasos claros, sin sorpresas y con fechas definidas."
        />

        <ol className="relative mt-14 space-y-8 border-l border-border pl-8 md:pl-12">
          <span className="absolute top-0 -left-px h-full w-px bg-[image:var(--gradient-aurora)] opacity-60" />
          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 80} className="relative">
              <span className="absolute -left-[2.6rem] grid h-9 w-9 place-items-center rounded-full border border-border bg-surface font-display text-xs font-bold text-primary md:-left-[3.85rem]">
                {step.n}
              </span>
              <h3 className="font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
