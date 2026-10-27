import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { ContentPage } from "@/components/ContentPage";
import { Reveal } from "@/components/Reveal";
import { whatsappLink } from "@/lib/site";

const title="Precio de Página Web y Desarrollo Web en Chile | Byto";
const description="Conoce cómo cotizamos páginas web, tiendas online y desarrollos a medida en Chile. El precio depende de páginas, diseño, contenido, SEO, integraciones y funcionalidades.";

export const Route=createFileRoute("/precios")({
  head:()=>({
    meta:[
      {title},
      {name:"description",content:description},
      {name:"robots",content:"index, follow, max-image-preview:large"},
      {property:"og:title",content:title},
      {property:"og:description",content:description},
    ],
    links:[{rel:"canonical",href:"https://byto.cl/precios"}],
  }),
  component:Page,
});

const plans=[
  {name:"Página Web Corporativa",text:"Para empresas, pymes y profesionales que necesitan una página web profesional orientada a contactos, servicios y posicionamiento en Google.",items:["Diseño web responsive","Páginas y secciones según alcance","SEO técnico y metadatos","Formularios, WhatsApp y analítica"]},
  {name:"Tienda Online",text:"Para negocios que quieren transformar su catálogo en un canal propio de ventas digitales con una experiencia de compra clara.",items:["Catálogo y productos","Carrito y checkout","Pagos y despacho según proyecto","SEO y analítica de conversiones"]},
  {name:"Desarrollo Web a Medida",text:"Para procesos que requieren software, automatización, paneles o una aplicación web propia.",items:["Levantamiento de requerimientos","Diseño UX/UI","Frontend y backend","Base de datos e integraciones"]},
];

function Page(){
  return <ContentPage eyebrow="Precios de Desarrollo Web" title="¿Cuánto cuesta una página web en Chile?" intro="El precio de una página web depende del alcance real del proyecto. En Byto cotizamos según cantidad de páginas, diseño, contenido, SEO, integraciones y funcionalidades para que pagues por lo que tu negocio necesita.">
    <Reveal className="mb-10 rounded-3xl border border-border bg-surface/50 p-7">
      <h2 className="font-display text-2xl font-bold">Qué influye en el precio de una página web</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Una landing page, un sitio corporativo, una tienda online y una aplicación web tienen niveles de trabajo distintos. También influyen la cantidad de contenido, el diseño personalizado, la administración, las integraciones, los medios de pago, el SEO y las automatizaciones.</p>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Por eso preferimos definir primero el objetivo comercial, la arquitectura y las funciones necesarias antes de entregar una cotización.</p>
    </Reveal>
    <div className="grid gap-5 lg:grid-cols-3">{plans.map((p,i)=>{const quoteUrl=whatsappLink(`Hola Byto, quiero solicitar una cotización para ${p.name}.`);return <Reveal key={p.name} delay={i*60} className="aurora-border glass-panel rounded-3xl p-7"><h2 className="font-display text-2xl font-bold">{p.name}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p><div className="mt-6 space-y-3">{p.items.map(x=><div key={x} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary"/><span>{x}</span></div>)}</div><a href={quoteUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary transition-opacity hover:opacity-80"><MessageCircle className="h-4 w-4"/>Solicitar cotización →</a></Reveal>})}</div>
    <Reveal className="mt-10 rounded-3xl border border-border p-7"><h2 className="font-display text-2xl font-bold">¿Por qué no publicamos un precio único?</h2><p className="mt-3 max-w-3xl text-muted-foreground">Dos páginas web pueden parecer similares visualmente y tener necesidades técnicas muy distintas. Definir el alcance antes de cotizar evita comparar soluciones que incluyen cosas diferentes y permite priorizar lo que realmente aporta valor al negocio.</p><div className="mt-5 flex flex-wrap gap-4 text-sm"><a href="/servicios/desarrollo-web" className="font-semibold text-primary">Ver desarrollo de páginas web →</a><a href="/contacto" className="font-semibold text-primary">Solicitar una cotización →</a></div></Reveal>
  </ContentPage>;
}
