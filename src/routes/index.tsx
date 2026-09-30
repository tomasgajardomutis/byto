import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/AuroraBackground";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SITE } from "@/lib/site";

const ServicesSection = lazy(() => import("@/components/ServicesSection").then((m) => ({ default: m.ServicesSection })));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection").then((m) => ({ default: m.PortfolioSection })));
const ProcessSection = lazy(() => import("@/components/ProcessSection").then((m) => ({ default: m.ProcessSection })));
const StylesSection = lazy(() => import("@/components/StylesSection").then((m) => ({ default: m.StylesSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then((m) => ({ default: m.ContactSection })));
const Footer = lazy(() => import("@/components/Footer").then((m) => ({ default: m.Footer })));
const WhatsAppFab = lazy(() => import("@/components/WhatsAppFab").then((m) => ({ default: m.WhatsAppFab })));
const CursorHalo = lazy(() => import("@/components/CursorHalo").then((m) => ({ default: m.CursorHalo })));

const title="Byto | Desarrollo web, e-commerce y SEO en Chile";
const description="Diseñamos y desarrollamos sitios web, tiendas online y aplicaciones web para empresas en Chile, con UX/UI, SEO técnico, rendimiento y medición.";

export const Route=createFileRoute("/")({head:()=>({meta:[{title},{name:"description",content:description},{name:"robots",content:"index, follow, max-image-preview:large"},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"website"},{property:"og:url",content:"https://byto.cl/"},{property:"og:locale",content:"es_CL"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:title},{name:"twitter:description",content:description}],links:[{rel:"canonical",href:"https://byto.cl/"}],scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://byto.cl/#business",name:"Byto",url:"https://byto.cl/",description,areaServed:{"@type":"Country",name:"Chile"},address:{"@type":"PostalAddress",addressLocality:"Santiago",addressRegion:"Región Metropolitana",addressCountry:"CL"},telephone:`+${SITE.whatsappNumber}`,email:SITE.email,provider:{"@id":"https://byto.cl/#organization"},knowsAbout:["Desarrollo web","Diseño UX/UI","E-commerce","Aplicaciones web","SEO técnico","SEO local","Google Business Profile","Analítica web"],hasOfferCatalog:{"@type":"OfferCatalog",name:"Servicios digitales de Byto",itemListElement:[{"@type":"Offer",itemOffered:{"@type":"Service",name:"Desarrollo Web",url:"https://byto.cl/servicios/desarrollo-web"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Tiendas Online",url:"https://byto.cl/servicios/tiendas-online"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Aplicaciones Web",url:"https://byto.cl/servicios/aplicaciones-web"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"SEO",url:"https://byto.cl/servicios/seo"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Google Business Profile",url:"https://byto.cl/servicios/google-business"}}]}})}]}),component:Landing});

function Landing(){
  return <>
    <AuroraBackground/>
    <Navbar/>
    <main>
      <Hero/>
      <Suspense fallback={null}>
        <ServicesSection/>
        <PortfolioSection/>
        <ProcessSection/>
        <StylesSection/>
        <ContactSection/>
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer/>
      <WhatsAppFab/>
      <CursorHalo/>
    </Suspense>
  </>;
}
