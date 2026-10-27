import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";

const title = "SEO y Posicionamiento Web en Google Chile | Byto";
const description = "Servicio SEO en Chile para empresas y pymes: auditoría SEO técnica, arquitectura, contenidos, enlazado interno, SEO local y medición para mejorar visibilidad orgánica.";

export const Route = createFileRoute("/servicios/seo")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://byto.cl/servicios/seo" },
    ],
    links: [{ rel: "canonical", href: "https://byto.cl/servicios/seo" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://byto.cl/servicios/seo#service",
        name: "SEO y posicionamiento web en Chile",
        alternateName: ["SEO Chile", "Posicionamiento web", "SEO técnico", "SEO local"],
        serviceType: "Optimización para motores de búsqueda",
        description,
        url: "https://byto.cl/servicios/seo",
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
    eyebrow="SEO y Posicionamiento Web"
    title="SEO para empresas que quieren aumentar su visibilidad en Google"
    intro="Trabajamos SEO técnico, arquitectura web, contenidos y enlazado interno para que Google pueda rastrear, entender e indexar mejor tu sitio y para que tus páginas respondan a búsquedas con intención comercial."
    description="El posicionamiento web no depende de una sola acción. Revisamos indexación, arquitectura, rendimiento, contenido, enlazado interno y señales locales para identificar qué limita la visibilidad orgánica. Luego priorizamos mejoras según intención de búsqueda, competencia y valor comercial. El objetivo es construir una base SEO sostenible y medible, no perseguir posiciones aisladas sin contexto."
    benefits={[
      "Mayor claridad sobre qué páginas deben competir por cada intención de búsqueda",
      "Sitio más fácil de rastrear, interpretar e indexar por Google",
      "Mejor alineación entre páginas de servicio, contenido y búsquedas relevantes",
      "Enlazado interno que distribuye mejor contexto y autoridad entre páginas",
      "Seguimiento de impresiones, clics, consultas e indexación",
      "Base preparada para SEO local, contenido editorial y crecimiento orgánico"
    ]}
    includes={[
      "Auditoría SEO técnica",
      "Revisión de indexación en Google Search Console",
      "Investigación y agrupación de palabras clave por intención",
      "Titles, meta descriptions y encabezados",
      "Arquitectura de información y páginas de servicio",
      "Enlazado interno y anchor text",
      "Sitemap, robots.txt y canonical",
      "Datos estructurados cuando corresponde",
      "SEO local y Google Business cuando aplica",
      "Medición de rendimiento orgánico"
    ]}
    idealFor={[
      "Empresas que tienen un sitio web pero casi no reciben tráfico desde Google.",
      "Pymes que quieren posicionar servicios concretos en Chile o Santiago.",
      "Negocios con varias páginas que compiten entre sí por las mismas búsquedas.",
      "Sitios nuevos que necesitan una arquitectura SEO correcta antes de publicar más contenido.",
      "Empresas que dependen demasiado de publicidad pagada y quieren desarrollar un canal orgánico."
    ]}
    process={[
      {title:"Auditoría e intención de búsqueda",description:"Revisamos el estado técnico del sitio y agrupamos las búsquedas según intención para saber qué páginas deben existir y qué objetivo debe cumplir cada una."},
      {title:"Arquitectura y optimización",description:"Ajustamos titles, encabezados, contenido, enlaces internos, indexación y estructura técnica según las oportunidades prioritarias."},
      {title:"Contenido y autoridad",description:"Definimos páginas o artículos que cubran preguntas y búsquedas relevantes sin duplicar ni canibalizar contenidos existentes."},
      {title:"Medición y mejora",description:"Seguimos impresiones, clics, consultas, páginas indexadas y conversiones para decidir las siguientes optimizaciones."}
    ]}
    faq={[
      {question:"¿SEO garantiza aparecer primero en Google?",answer:"No. Ningún proveedor puede garantizar una posición concreta. El resultado depende de competencia, autoridad, calidad del contenido, experiencia de usuario y evolución de los sistemas de búsqueda."},
      {question:"¿Cuánto demora el posicionamiento SEO?",answer:"SEO suele ser gradual. Algunas correcciones técnicas pueden ser detectadas en días o semanas, mientras que mejorar posiciones competitivas normalmente requiere más tiempo, contenido y autoridad."},
      {question:"¿Qué diferencia hay entre SEO técnico y SEO de contenidos?",answer:"El SEO técnico ayuda a que el sitio pueda rastrearse, indexarse y funcionar correctamente. El SEO de contenidos trabaja qué información ofrece cada página, para qué búsquedas responde y cómo se relaciona con otras páginas del sitio."},
      {question:"¿También trabajan SEO local?",answer:"Sí. Cuando el negocio atiende una zona geográfica definida podemos trabajar consistencia de información, páginas locales y optimización del Perfil de Empresa de Google."},
      {question:"¿Necesito publicar artículos para posicionar?",answer:"No siempre. Primero conviene optimizar las páginas comerciales existentes. El blog tiene sentido cuando existen búsquedas informativas relevantes que apoyan los servicios y ayudan al usuario a avanzar en su decisión."}
    ]}
    relatedLinks={[
      {"title":"Desarrollo Web","description":"Una arquitectura web sólida facilita rastreo, rendimiento y posicionamiento orgánico.","href":"/servicios/desarrollo-web"},
      {"title":"Google Business","description":"Complementa el SEO con una presencia local consistente en Google Search y Maps.","href":"/servicios/google-business"},
      {"title":"Blog","description":"Explora guías sobre páginas web, SEO, e-commerce y crecimiento digital.","href":"/blog"},
      {"title":"Contacto","description":"Cuéntanos qué búsquedas y servicios quieres posicionar y revisamos el punto de partida.","href":"/contacto"}
    ]}
  />;
}
