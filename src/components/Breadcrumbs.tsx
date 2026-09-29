import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

const LABELS: Record<string,string>={servicios:"Servicios","desarrollo-web":"Desarrollo Web","tiendas-online":"Tiendas Online","aplicaciones-web":"Aplicaciones Web",seo:"SEO","google-business":"Google Business",proyectos:"Proyectos",contacto:"Contacto",nosotros:"Nosotros",precios:"Precios",blog:"Blog","preguntas-frecuentes":"Preguntas frecuentes",privacidad:"Privacidad",terminos:"Términos",admin:"Administración"};
const SITE_URL="https://byto.cl";
const labelFor=(segment:string)=>LABELS[segment]||decodeURIComponent(segment).replace(/-/g," ").replace(/(^|\s)\S/g,c=>c.toUpperCase());

export function Breadcrumbs({currentLabel}:{currentLabel?:string}){
 const {pathname}=useLocation();
 const segments=pathname.split("/").filter(Boolean);
 if(!segments.length)return null;
 const items=[{label:"Inicio",path:"/"},...segments.map((segment,index)=>({label:index===segments.length-1&&currentLabel?currentLabel:labelFor(segment),path:`/${segments.slice(0,index+1).join("/")}`}))];
 const schema={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:items.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.label,item:`${SITE_URL}${item.path}`}))};
 return <><nav aria-label="Breadcrumb" className="mb-6"><ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">{items.map((item,index)=>{const last=index===items.length-1;return <li key={item.path} className="flex items-center gap-1.5">{index>0&&<ChevronRight className="h-3.5 w-3.5 opacity-50"/>}{last?<span aria-current="page" className="font-medium text-foreground">{item.label}</span>:<Link to={item.path} className="inline-flex items-center gap-1 transition-colors hover:text-primary">{index===0&&<Home className="h-3.5 w-3.5"/>}{item.label}</Link>}</li>})}</ol></nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></>;
}
