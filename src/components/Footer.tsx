import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function Footer() {
  return <footer className="border-t border-border px-5 py-10"><div className="mx-auto max-w-6xl">
    <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><p className="font-display text-lg font-bold"><span className="text-aurora">{SITE.name}</span></p><p className="mt-2 max-w-sm text-sm text-muted-foreground">Desarrollo web, e-commerce y soluciones digitales · {SITE.city}</p></div>
      <div><p className="font-display font-semibold">Explora</p><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link to="/servicios" className="hover:text-primary">Servicios</Link><Link to="/proyectos" className="hover:text-primary">Proyectos</Link><Link to="/nosotros" className="hover:text-primary">Nosotros</Link><Link to="/precios" className="hover:text-primary">Precios</Link><Link to="/blog" className="hover:text-primary">Blog</Link><Link to="/preguntas-frecuentes" className="hover:text-primary">Preguntas frecuentes</Link></div></div>
      <div><p className="font-display font-semibold">Información</p><div className="mt-3 grid gap-2 text-sm text-muted-foreground"><Link to="/contacto" className="hover:text-primary">Contacto</Link><Link to="/privacidad" className="hover:text-primary">Privacidad</Link><Link to="/terminos" className="hover:text-primary">Términos</Link></div></div>
    </div>
    <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Byto</span><Link to="/admin" className="transition-colors hover:text-primary">Admin</Link></div>
  </div></footer>;
}
