import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Panel de administración | Byto" },
      { name: "description", content: "Administración de contenidos del sitio de Byto." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
