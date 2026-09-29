import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-7xl font-bold text-foreground">404</h1><h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2><p className="mt-2 text-sm text-muted-foreground">La página que buscas no existe o fue movida.</p><div className="mt-6"><Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Volver al inicio</Link></div></div></div>;
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) { console.error(error); const router = useRouter(); useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]); return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><h1 className="text-xl font-semibold tracking-tight text-foreground">No pudimos cargar esta página</h1><p className="mt-2 text-sm text-muted-foreground">Ocurrió un problema. Puedes volver a intentarlo o regresar al inicio.</p><div className="mt-6 flex flex-wrap justify-center gap-2"><button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">Reintentar</button><a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">Ir al inicio</a></div></div></div>; }

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },{ name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Byto | Desarrollo web, e-commerce y SEO en Chile" },
      { name: "description", content: "Byto desarrolla sitios web, tiendas online y aplicaciones web para empresas en Chile, con foco en UX/UI, rendimiento, SEO y crecimiento digital." },
      { name: "author", content: "Byto" },{ name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#12131f" },{ property: "og:site_name", content: "Byto" },{ property: "og:type", content: "website" },{ property: "og:locale", content: "es_CL" },{ name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss },{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://byto.cl/#organization",name:"Byto",url:"https://byto.cl/",logo:{"@type":"ImageObject",url:"https://byto.cl/favicon.svg"},description:"Desarrollo web, e-commerce, aplicaciones web y SEO para empresas en Chile."},{"@type":"WebSite","@id":"https://byto.cl/#website",url:"https://byto.cl/",name:"Byto",inLanguage:"es-CL",publisher:{"@id":"https://byto.cl/#organization"}}]})}]
  }),
  shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="es-CL" className="dark"><head><HeadContent /></head><body>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); return <QueryClientProvider client={queryClient}><Outlet /><Toaster position="top-center" richColors /></QueryClientProvider>; }
