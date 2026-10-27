import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/ContentPage";
import { Reveal } from "@/components/Reveal";

const title="Byto | Estudio de Desarrollo Web en Santiago, Chile";
const description="Conoce cómo trabaja Byto, estudio de desarrollo web en Santiago especializado en páginas web, e-commerce, aplicaciones web, SEO técnico y Google Business.";

export const Route=createFileRoute("/nosotros")({
  head:()=>({
    meta:[
      {title},
      {name:"description",content:description},
      {name:"robots",content:"index, follow, max-image-preview:large"},
      {property:"og:title",content:title},
      {property:"og:description",content:description},
    ],
    links:[{rel:"canonical",href:"https://byto.cl/nosotros"}],
  }),
  component:Page,
});

function Page(){
  return <ContentPage eyebrow="Sobre Byto" title="Desarrollo web con estrategia, tecnología y foco comercial" intro="Byto es un estudio de desarrollo web en Santiago, Chile. Diseñamos y desarrollamos páginas web, tiendas online y aplicaciones para empresas, pymes y emprendimientos que necesitan una presencia digital clara, rápida y preparada para crecer.">
    <Reveal className="mb-10 rounded-3xl border border-border bg-surface/50 p-8">
      <h2 className="font-display text-3xl font-bold">Qué hacemos</h2>
      <p className="mt-4 max-w-4xl leading-8 text-muted-foreground">Trabajamos proyectos de desarrollo web, diseño UX/UI, e-commerce, aplicaciones web, SEO técnico y optimización de Google Business Profile. La tecnología se define según el objetivo del negocio y no al revés: primero entendemos qué debe conseguir el sitio y luego construimos la solución adecuada.</p>
    </Reveal>

    <div className="grid gap-5 md:grid-cols-3">
      {[
        ["Entender primero","Antes de desarrollar, analizamos el negocio, sus clientes, servicios, competencia y objetivo del proyecto para definir una estructura útil."],
        ["Construir con propósito","Diseño, contenido, SEO y tecnología se trabajan como partes de una misma solución orientada a contactos, ventas o eficiencia."],
        ["Medir y mejorar","Configuramos una base que permita observar resultados, detectar oportunidades y seguir incorporando páginas, contenido e integraciones."]
      ].map(([h,p],i)=><Reveal key={h} delay={i*50} className="aurora-border glass-panel rounded-3xl p-7"><h2 className="font-display text-xl font-semibold">{h}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{p}</p></Reveal>)}
    </div>

    <Reveal className="mt-12 glass-panel rounded-3xl border border-border p-8 md:p-10">
      <h2 className="font-display text-3xl font-bold">Cómo trabajamos un proyecto web</h2>
      <p className="mt-4 max-w-4xl leading-relaxed text-muted-foreground">Partimos por objetivos, público, servicios y contenido. Después definimos arquitectura, diseño responsive, desarrollo, SEO técnico, analítica y publicación. Esta metodología se aplica tanto a páginas web corporativas como a tiendas online y aplicaciones web a medida.</p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <a href="/servicios/desarrollo-web" className="font-semibold text-primary">Desarrollo de páginas web →</a>
        <a href="/servicios/seo" className="font-semibold text-primary">SEO y posicionamiento →</a>
        <a href="/proyectos" className="font-semibold text-primary">Ver proyectos →</a>
        <a href="/contacto" className="font-semibold text-primary">Conversemos →</a>
      </div>
    </Reveal>
  </ContentPage>;
}
