import { lazy, Suspense, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SITE } from "@/lib/site";

const AuroraBackground = lazy(() => import("@/components/AuroraBackground").then((m) => ({ default: m.AuroraBackground })));
const ServicesSection = lazy(() => import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection").then((m) => ({ default: m.PortfolioSection })));
const ProcessSection = lazy(() => import("@/components/ProcessSection").then((m) => ({ default: m.ProcessSection })));
const StylesSection = lazy(() => import("@/components/StylesSection").then((m) => ({ default: m.StylesSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const WhatsAppFab = lazy(() => import("@/components/WhatsAppFab").then((m) => ({ default: m.WhatsAppFab })));
const CursorHalo = lazy(() => import("@/components/CursorHalo").then((m) => ({ default: m.CursorHalo })));

const title="Desarrollo Web y Páginas Web en Chile | Byto";
const description="Desarrollo web en Chile para empresas, pymes y emprendimientos. Creamos páginas web profesionales, tiendas online y aplicaciones web con diseño UX/UI, SEO técnico y alto rendimiento.";

const crawlLinks = [
  ["Desarrollo Web", "/servicios/desarrollo-web"],
  ["Tiendas Online", "/servicios/tiendas-online"],
  ["Aplicaciones Web", "/servicios/aplicaciones-web"],
  ["SEO", "/servicios/seo"],
  ["Google Business", "/servicios/google-business"],
  ["Proyectos", "/proyectos"],
  ["Blog", "/blog"],
  ["Nosotros", "/nosotros"],
  ["Contacto", "/contacto"],
] as const;

export const Route=createFileRoute("/")({head:()=>({meta:[{title},{name:"description",content:description},{name:"robots",content:"index, follow, max-image-preview:large"},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"website"},{property:"og:url",content:"https://byto.cl/"},{property:"og:locale",content:"es_CL"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:title},{name:"twitter:description",content:description}],links:[{rel:"canonical",href:"https://byto.cl/"}],scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://byto.cl/#business",name:"Byto",url:"https://byto.cl/",description,areaServed:{"@type":"Country",name:"Chile"},address:{"@type":"PostalAddress",addressLocality:"Santiago",addressRegion:"Región Metropolitana",addressCountry:"CL"},telephone:`+${SITE.whatsappNumber}`,email:SITE.email,provider:{"@id":"https://byto.cl/#organization"},knowsAbout:["Desarrollo web","Diseño UX/UI","E-commerce","Aplicaciones web","SEO técnico","SEO local","Google Business Profile","Analítica web"],hasOfferCatalog:{"@type":"OfferCatalog",name:"Servicios digitales de Byto",itemListElement:[{"@type":"Offer",itemOffered:{"@type":"Service",name:"Desarrollo Web",url:"https://byto.cl/servicios/desarrollo-web"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Tiendas Online",url:"https://byto.cl/servicios/tiendas-online"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Aplicaciones Web",url:"https://byto.cl/servicios/aplicaciones-web"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"SEO",url:"https://byto.cl/servicios/seo"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Google Business Profile",url:"https://byto.cl/servicios/google-business"}}]}})}]}),component:Landing});

function DeferredHomeContent(){
  const [ready,setReady]=useState(false);
  useEffect(()=>{
    let timeout=0;
    let idle=0;
    const start=()=>setReady(true);
    if("requestIdleCallback" in window){
      idle=(window as Window & {requestIdleCallback:(cb:()=>void,opts?:{timeout:number})=>number}).requestIdleCallback(start,{timeout:2500});
    }else{
      timeout=window.setTimeout(start,1200);
    }
    return()=>{
      if(timeout)window.clearTimeout(timeout);
      if(idle&&"cancelIdleCallback" in window)(window as Window & {cancelIdleCallback:(id:number)=>void}).cancelIdleCallback(idle);
    };
  },[]);
  if(!ready)return null;
  return <Suspense fallback={null}><ServicesSection/><PortfolioSection/><ProcessSection/><StylesSection/><ContactSection/><Footer/><WhatsAppFab/><CursorHalo/></Suspense>;
}

function Landing(){
  return <>
    <Suspense fallback={null}><AuroraBackground/></Suspense>
    <Navbar/>
    <main><Hero/>
      <section className="px-5 pb-14">
        <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-surface/40 p-7 md:p-10">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Desarrollo web para empresas que necesitan generar resultados</h2>
          <p className="mt-4 leading-8 text-muted-foreground">Byto es un estudio de desarrollo web en Santiago que crea páginas web profesionales para empresas, pymes y emprendimientos en Chile. Diseñamos sitios corporativos, tiendas online y aplicaciones web con una estructura clara, experiencia móvil, SEO técnico y medición desde el inicio.</p>
          <p className="mt-4 leading-8 text-muted-foreground">Si necesitas una nueva página web, renovar un sitio antiguo o mejorar tu presencia en Google, trabajamos desde la arquitectura de contenidos y el diseño UX/UI hasta el desarrollo, publicación e indexación. El objetivo es construir una web útil para tus clientes y preparada para crecer.</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm">{crawlLinks.map(([label,href])=><a key={href} href={href} className="font-semibold text-primary hover:underline">{label}</a>)}</div>
        </div>
      </section>
      <DeferredHomeContent/>
    </main>
  </>;
}
