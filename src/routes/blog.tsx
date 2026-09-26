import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/ContentPage";
import { Reveal } from "@/components/Reveal";
const title="Blog de Desarrollo Web y Negocios Digitales | Byto"; const description="Guías de Byto sobre desarrollo web, e-commerce, SEO, Google Business y tecnología para negocios.";
export const Route=createFileRoute("/blog")({head:()=>({meta:[{title},{name:"description",content:description}],links:[{rel:"canonical",href:"/blog"}]}),component:Page});
const topics=["Desarrollo web","Tiendas online","Aplicaciones web","SEO","Google Business"];
function Page(){return <ContentPage eyebrow="Blog" title="Ideas y guías para tomar mejores decisiones digitales" intro="Contenido práctico sobre sitios web, ventas online, posicionamiento y herramientas digitales para empresas y emprendimientos."><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{topics.map((topic,i)=><Reveal key={topic} delay={i*50} className="glass-panel rounded-3xl border border-border p-7"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Próximamente</p><h2 className="mt-3 font-display text-2xl font-bold">{topic}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Estamos preparando guías y recursos sobre {topic.toLowerCase()} enfocados en decisiones reales de negocio.</p></Reveal>)}</div></ContentPage>}
