import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, LogOut, ShieldX } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { AdminCrud } from "@/components/admin/AdminCrud";
import { AdminMessages } from "@/components/admin/AdminMessages";
import { AuroraBackground } from "@/components/AuroraBackground";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Panel de administración | Byto" },
      { name: "description", content: "Administración de contenidos del sitio de Byto." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Panel de administración | Byto" },
      { property: "og:description", content: "Área privada de Byto." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AdminPage,
});

const tabs = [
  { id: "servicios", label: "Servicios" },
  { id: "portafolio", label: "Portafolio" },
  { id: "estilos", label: "Estilos" },
  { id: "mensajes", label: "Mensajes" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function AdminPage() {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<TabId>("servicios");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    let cancelled = false;
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setIsAdmin(Boolean(data));
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
  }

  return (
    <div className="relative min-h-screen px-5 py-10">
      <AuroraBackground />

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al sitio
          </Link>
          {session && (
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2/60 px-4 py-2.5 text-sm font-semibold"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          )}
        </div>

        {!session && <AdminAuth />}

        {session && isAdmin === false && (
          <div className="glass-panel mx-auto max-w-md rounded-3xl p-7 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-destructive/20 text-destructive">
              <ShieldX className="h-6 w-6" />
            </span>
            <h1 className="mt-5 font-display text-2xl font-bold">Sin acceso</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              La cuenta {session.user.email} no tiene permisos de administración.
            </p>
          </div>
        )}

        {session && isAdmin && (
          <>
            <h1 className="font-display text-3xl font-bold">
              Panel de <span className="text-aurora">Byto</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Edita el contenido del sitio. Los cambios se ven al instante.
            </p>

            <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "shrink-0 rounded-xl px-4 py-2.5 font-display text-sm font-semibold transition-colors",
                    tab === t.id
                      ? "bg-[image:var(--gradient-aurora)] text-background"
                      : "border border-border bg-surface-2/60 text-muted-foreground",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === "servicios" && (
                <AdminCrud
                  table="services"
                  queryKey="services"
                  titleKey="title"
                  emptyRow={{ title: "Nuevo servicio", description: "", icon: "sparkles" }}
                  fields={[
                    { key: "title", label: "Título" },
                    {
                      key: "icon",
                      label: "Ícono",
                      type: "select",
                      options: [
                        { value: "code", label: "Código" },
                        { value: "cart", label: "Carrito" },
                        { value: "search", label: "Búsqueda" },
                        { value: "layers", label: "Capas" },
                        { value: "mappin", label: "Mapa" },
                        { value: "sparkles", label: "Destellos" },
                      ],
                    },
                    { key: "description", label: "Descripción", type: "textarea" },
                    { key: "sort_order", label: "Orden", type: "number" },
                    { key: "is_active", label: "Visible en el sitio", type: "switch" },
                  ]}
                />
              )}

              {tab === "portafolio" && (
                <AdminCrud
                  table="projects"
                  queryKey="projects"
                  titleKey="title"
                  emptyRow={{ title: "Nuevo proyecto", description: "", tags: "" }}
                  fields={[
                    { key: "title", label: "Título" },
                    { key: "link_url", label: "Enlace al sitio", placeholder: "https://..." },
                    {
                      key: "image_url",
                      label: "Imagen (URL)",
                      placeholder: "Vacío = imagen por defecto",
                    },
                    { key: "tags", label: "Etiquetas (separadas por coma)" },
                    { key: "description", label: "Descripción", type: "textarea" },
                    { key: "sort_order", label: "Orden", type: "number" },
                    { key: "is_active", label: "Visible en el sitio", type: "switch" },
                  ]}
                />
              )}

              {tab === "estilos" && (
                <AdminCrud
                  table="design_styles"
                  queryKey="design_styles"
                  titleKey="name"
                  emptyRow={{ name: "Nuevo estilo", preview_key: "aurora" }}
                  fields={[
                    { key: "name", label: "Nombre" },
                    {
                      key: "preview_key",
                      label: "Vista previa",
                      type: "select",
                      options: [
                        { value: "bento", label: "Bento Grid" },
                        { value: "aurora", label: "Aurora UI" },
                        { value: "brutal", label: "Neo-brutalismo" },
                        { value: "flat", label: "Flat Design 2.0" },
                        { value: "glass", label: "Glassmorphism" },
                        { value: "clay", label: "Claymorphism" },
                        { value: "neu", label: "Neumorphism" },
                        { value: "skeu", label: "Skeuomorphism" },
                      ],
                    },
                    {
                      key: "image_url",
                      label: "Imagen de referencia (URL)",
                      placeholder: "Vacío = vista previa generada",
                    },
                    { key: "ease_level", label: "Facilidad de uso" },
                    { key: "feeling", label: "Qué transmite", type: "textarea" },
                    { key: "ideal_business", label: "Negocio ideal", type: "textarea" },
                    { key: "commercial_advantage", label: "Ventaja comercial", type: "textarea" },
                    { key: "sort_order", label: "Orden", type: "number" },
                    { key: "is_active", label: "Visible en el sitio", type: "switch" },
                  ]}
                />
              )}

              {tab === "mensajes" && <AdminMessages />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
