import { useEffect, useState } from "react";

import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/#proceso", label: "Proceso" },
  { href: "/#estilos", label: "Estilos" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color,box-shadow] duration-300", scrolled ? "glass-panel border-x-0 border-t-0" : "border-b border-transparent")}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="/" aria-label="Byto - Inicio" className="flex h-14 w-[123px] shrink-0 items-center">
          <img src="/byto-logo.svg" alt="Byto" width="363" height="166" fetchPriority="high" decoding="async" className="block h-12 w-[105px] object-contain" />
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => <li key={l.href}><a href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">{l.label}</a></li>)}
        </ul>
        <a href={whatsappLink("Hola Byto, quiero cotizar un proyecto web.")} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-[image:var(--gradient-aurora)] px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03] md:inline-flex">
          Hablemos
        </a>
        <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface/70 text-foreground md:hidden">
          <span aria-hidden="true" className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </nav>
      {open && <div className="glass-panel fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col gap-2 px-5 py-8 md:hidden">
        {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl border border-border bg-surface/60 px-5 py-4 font-display text-lg font-semibold">{l.label}</a>)}
        <a href={whatsappLink("Hola Byto, quiero cotizar un proyecto web.")} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-aurora)] px-5 py-4 font-display text-lg font-bold text-background">Escribir por WhatsApp</a>
      </div>}
    </header>
  );
}
