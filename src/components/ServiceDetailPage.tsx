import { CheckCircle2, MessageCircle } from "lucide-react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal } from "@/components/Reveal";
import { whatsappLink } from "@/lib/site";

export interface ServiceDetailProps {
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  benefits: string[];
  includes: string[];
}

export function ServiceDetailPage({ eyebrow, title, intro, description, benefits, includes }: ServiceDetailProps) {
  return (
    <>
      <AuroraBackground />
      <CursorHalo />
      <Navbar />
      <main className="px-5 pb-24 pt-28 md:pt-36">
        <section className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
            <a href={whatsappLink(`Hola Byto, quiero conversar sobre ${eyebrow}.`)} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3 font-semibold text-background transition-transform hover:scale-[1.03]">
              <MessageCircle className="h-5 w-5" /> Cotizar proyecto
            </a>
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal className="aurora-border glass-panel rounded-3xl p-7 md:p-9">
              <h2 className="font-display text-2xl font-semibold">Una solución pensada para tu negocio</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>
              <div className="mt-7 space-y-3">
                {benefits.map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{item}</span></div>)}
              </div>
            </Reveal>
            <Reveal delay={80} className="aurora-border glass-panel rounded-3xl p-7 md:p-9">
              <h2 className="font-display text-2xl font-semibold">Qué incluye</h2>
              <div className="mt-6 space-y-3">
                {includes.map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-neon" /><span className="text-muted-foreground">{item}</span></div>)}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
