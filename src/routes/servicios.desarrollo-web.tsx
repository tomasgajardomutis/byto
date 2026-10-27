import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";

const title = "Desarrollo Web y Páginas Web en Chile | Byto";
const description = "Desarrollo de páginas web profesionales en Chile para empresas, pymes y emprendimientos. Diseño web responsive, SEO técnico, rendimiento, analítica y soporte.";

export const Route = createFileRoute("/servicios/desarrollo-web")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://byto.cl/servicios/desarrollo-web" },
    ],
    links: [{ rel: "canonical", href: "https://byto.cl/servicios/desarrollo-web" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://byto.cl/servicios/desarrollo-web#service",
        name: "Desarrollo de páginas web en Chile",
        alternateName: ["Desarrollo web", "Diseño web", "Creación de páginas web"],
        serviceType: "Desarrollo y diseño de páginas web",
        description,
        url: "https://byto.cl/servicios/desarrollo-web",
        areaServed: [
          { "@type": "Country", name: "Chile" },
          { "@type": "City", name: "Santiago" }
        ],
        provider: { "@id": "https://byto.cl/#organization" },
      }),
    }],
  }),
  component: Page,
});

function Page() {
  return <ServiceDetailPage
    eyebrow="Desarrollo Web en Chile"
    title="Desarrollo de páginas web profesionales para empresas y pymes"
    intro="Diseñamos y desarrollamos páginas web en Chile enfocadas en generar confianza, captar oportunidades comerciales y funcionar rápido en celulares, computadores y buscadores."
    description="En Byto creamos sitios web corporativos y páginas web a medida para empresas, pymes, profesionales y emprendimientos. Trabajamos arquitectura de contenidos, diseño UX/UI, desarrollo frontend, integraciones, SEO técnico y analítica desde el inicio. Cada sitio se construye según el objetivo del negocio: conseguir contactos, presentar servicios, apoyar campañas, vender o fortalecer la presencia digital."
    benefits={[
      "Diseño web responsive y mobile-first para celulares, tablets y computadores",
      "Arquitectura de páginas orientada a servicios, clientes y búsquedas relevantes",
      "SEO técnico, metadatos, datos estructurados e indexación desde el desarrollo",
      "Optimización de rendimiento y buenas prácticas para mejorar la experiencia de carga",
      "Integración con formularios, WhatsApp, analítica y herramientas comerciales",
      "Base escalable para agregar nuevas páginas, contenidos e integraciones"
    ]}
    includes={[
      "Definición de objetivos, público y arquitectura del sitio",
      "Diseño UX/UI y diseño visual responsive",
      "Desarrollo de página de inicio y páginas de servicios",
      "Desarrollo frontend y backend cuando el proyecto lo requiere",
      "Formularios de contacto y enlaces a WhatsApp",
      "SEO on-page y SEO técnico inicial",
      "Titles, meta descriptions, canonical y sitemap",
      "Google Analytics y medición según alcance",
      "Configuración de dominio, publicación e indexación"
    ]}
    idealFor={[
      "Empresas que buscan desarrollo web profesional en Chile.",
      "Pymes que necesitan una página web para captar clientes desde Google.",
      "Negocios que quieren renovar un sitio antiguo, lento o difícil de usar en celular.",
      "Profesionales y emprendimientos que necesitan una presencia digital más sólida que las redes sociales.",
      "Empresas que planean invertir en SEO, Google Ads u otras campañas y necesitan una web preparada para convertir."
    ]}
    process={[
      {title:"Estrategia y arquitectura",description:"Entendemos el negocio, los servicios, el público y las búsquedas relevantes para definir qué páginas necesita el sitio y cómo deben conectarse."},
      {title:"Diseño web UX/UI",description:"Diseñamos una experiencia clara y responsive, priorizando jerarquía visual, contenido, navegación y llamadas a la acción."},
      {title:"Desarrollo y SEO técnico",description:"Programamos el sitio, configuramos metadatos, rendimiento, indexación, analítica y las integraciones acordadas."},
      {title:"Publicación y mejora",description:"Publicamos el sitio, verificamos su funcionamiento y dejamos una base preparada para nuevas páginas, contenidos y optimizaciones SEO."}
    ]}
    faq={[
      {question:"¿Cuánto cuesta desarrollar una página web en Chile?",answer:"El precio depende de la cantidad de páginas, diseño, contenido, integraciones, administración y funcionalidades. Definimos el alcance antes de cotizar para evitar cobrar funciones que el negocio no necesita."},
      {question:"¿Cuánto demora el desarrollo de una página web?",answer:"Depende del alcance y de la disponibilidad de contenidos y validaciones. Un sitio corporativo tiene tiempos distintos a una tienda online o una aplicación web a medida."},
      {question:"¿La página web quedará optimizada para Google?",answer:"Incluimos una base de SEO técnico y on-page: estructura semántica, metadatos, canonical, sitemap, indexación y buenas prácticas de rendimiento. El posicionamiento competitivo requiere además contenido, autoridad y trabajo continuo."},
      {question:"¿El sitio funcionará bien en celulares?",answer:"Sí. El desarrollo es responsive y mobile-first, con navegación, contenido y llamadas a la acción adaptadas a distintos tamaños de pantalla."},
      {question:"¿Puedo ampliar el sitio después?",answer:"Sí. La arquitectura se plantea para incorporar nuevas páginas, contenidos, servicios e integraciones a medida que crece el negocio."}
    ]}
    relatedLinks={[
      {"title":"SEO","description":"Complementa tu página web con una estrategia de posicionamiento orgánico y arquitectura orientada a búsquedas.","href":"/servicios/seo"},
      {"title":"Tiendas Online","description":"Si necesitas vender productos o servicios directamente, revisa nuestro desarrollo de e-commerce.","href":"/servicios/tiendas-online"},
      {"title":"Proyectos","description":"Conoce ejemplos de sitios y soluciones digitales desarrolladas por Byto.","href":"/proyectos"},
      {"title":"Precios","description":"Revisa cómo definimos una cotización de página web según alcance y necesidades reales.","href":"/precios"}
    ]}
  />;
}
