import { createFileRoute } from "@tanstack/react-router";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StylesSection } from "@/components/StylesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SITE } from "@/lib/site";
const title="Byto | Desarrollo web, e-commerce y SEO en Chile";
const description="Diseñamos y desarrollamos sitios web, tiendas online y aplicaciones web para empresas en Chile, con UX/UI, SEO técnico, rendimiento y medición.";
export const Route=createFileRoute("/")({head:()=>({meta:[{title},{name:"description",content:description},{name:"robots",content:"index, follow, max-image-preview:large"},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"website"},{property:"og:url",content:"https://byto.cl/"},{property:"og:locale",content:"es_CL"},{name:"twitter:card",content:"summary_large_image"},{name:"twitter:title",content:title},{name:"twitter:description",content:description}],links:[{rel:"canonical",href:"https://byto.cl/"}],scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"ProfessionalService","@id":"https://byto.cl/#business",name:"Byto",url:"https://byto.cl/",description,areaServed:{"@type":"Country",name:"Chile"},address:{"@type":"PostalAddress",addressLocality:"Santiago",addressRegion:"Región Metropolitana",addressCountry:"CL"},telephone:`+${SITE.whatsappNumber}`,email:SITE.email,provider:{"@id":"https://byto.cl/#organization"},knowsAbout:["Desarrollo web","Diseño UX/UI","E-commerce","Aplicaciones web","SEO técnico","SEO local","Google Business Profile","Analítica web"],hasOfferCatalog:{"@type":"OfferCatalog",name:"Servicios digitales de Byto",itemListElement:[{"@type":"Offer",itemOffered:{"@type":"Service",name:"Desarrollo Web",url:"https://byto.cl/servicios/desarrollo-web"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Tiendas Online",url:"https://byto.cl/servicios/tiendas-online"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Aplicaciones Web",url:"https://byto.cl/servicios/aplicaciones-web"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"SEO",url:"https://byto.cl/servicios/seo"}},{"@type":"Offer",itemOffered:{"@type":"Service",name:"Google Business Profile",url:"https://byto.cl/servicios/google-business"}}]}})}]}),component:Landing});
function Landing(){return <><AuroraBackground/><CursorHalo/><Navbar/><main><Hero/><ServicesSection/><PortfolioSection/><ProcessSection/><StylesSection/><ContactSection/></main><Footer/><WhatsAppFab/></>}
