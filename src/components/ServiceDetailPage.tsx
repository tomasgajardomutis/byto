import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
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
  idealFor?: string[];
  process?: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
}

export function ServiceDetailPage({ eyebrow, title, intro, description, benefits, includes, idealFor = [], process = [], faq = [] }: ServiceDetailProps) {
  const quoteUrl = whatsappLink(`Hola Byto, quiero cotizar un proyecto de ${eyebrow}.`);
  return <>
    <AuroraBackground /><CursorHalo /><Navbar />
    <main>
      <section className="px-5 pb-16 pt-32 md:pb-24 md:pt-40"><div className="mx-auto max-w-6xl"><Reveal>
        <a href="/servicios" className="text-sm font-semibold text-primary">Servicios / {eyebrow}</a>
        <h1 className="mt-5 max-w-5xl font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p>
        <div className="mt-8 flex flex-wrap gap-3"><a href={quoteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3 font-semibold text-background"><MessageCircle className="h-5 w-5" /> Cotizar proyecto</a><a href="#incluye" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 font-semibold">Ver qué incluye <ArrowRight className="h-4 w-4" /></a></div>
      </Reveal></div></section>

      <section className="px-5 py-12 md:py-20"><div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <Reveal className="aurora-border glass-panel rounded-3xl p-7 md:p-9"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">El objetivo</p><h2 className="mt-3 font-display text-3xl font-semibold">Una solución pensada para tu negocio</h2><p className="mt-5 leading-relaxed text-muted-foreground">{description}</p></Reveal>
        <Reveal delay={80} className="aurora-border glass-panel rounded-3xl p-7 md:p-9"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Beneficios</p><div className="mt-6 space-y-4">{benefits.map(item=><div key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary"/><span>{item}</span></div>)}</div></Reveal>
      </div></section>

      <section id="incluye" className="px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><Reveal><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Alcance</p><h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Qué incluye el servicio</h2></Reveal><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{includes.map((item,i)=><Reveal key={item} delay={i*40} className="glass-panel rounded-2xl border border-border p-5"><CheckCircle2 className="h-5 w-5 text-neon"/><p className="mt-3 font-medium">{item}</p></Reveal>)}</div></div></section>

      {idealFor.length > 0 && <section className="px-5 py-16"><div className="mx-auto max-w-6xl"><Reveal><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">¿Es para ti?</p><h2 className="mt-3 font-display text-3xl font-bold">Ideal para</h2></Reveal><div className="mt-8 grid gap-4 md:grid-cols-2">{idealFor.map((item,i)=><Reveal key={item} delay={i*40} className="aurora-border glass-panel rounded-2xl p-6"><p className="leading-relaxed text-muted-foreground">{item}</p></Reveal>)}</div></div></section>}

      {process.length > 0 && <section className="px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><Reveal><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Cómo trabajamos</p><h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Del objetivo a una solución publicada</h2></Reveal><div className="mt-10 grid gap-4 md:grid-cols-3">{process.map((step,i)=><Reveal key={step.title} delay={i*50} className="glass-panel rounded-3xl border border-border p-6"><span className="font-display text-3xl font-bold text-primary/70">0{i+1}</span><h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p></Reveal>)}</div></div></section>}

      {faq.length > 0 && <section className="px-5 py-16"><div className="mx-auto max-w-4xl"><Reveal><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Preguntas frecuentes</p><h2 className="mt-3 font-display text-3xl font-bold">Antes de comenzar</h2></Reveal><div className="mt-8 space-y-3">{faq.map(item=><details key={item.question} className="glass-panel rounded-2xl border border-border p-5"><summary className="cursor-pointer font-display font-semibold">{item.question}</summary><p className="mt-3 leading-relaxed text-muted-foreground">{item.answer}</p></details>)}</div></div></section>}

      <section className="px-5 py-20"><Reveal className="aurora-border glass-panel mx-auto max-w-4xl rounded-3xl p-8 text-center md:p-12"><h2 className="font-display text-3xl font-bold">¿Tienes un proyecto en mente?</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Cuéntanos qué necesitas y revisamos contigo el alcance, prioridades y próximos pasos.</p><a href={quoteUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-6 py-3 font-semibold text-background"><MessageCircle className="h-5 w-5"/> Hablemos por WhatsApp</a></Reveal></section>
    </main><Footer/><WhatsAppFab/>
  </>;
}
