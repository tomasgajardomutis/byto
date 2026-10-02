import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

const STATIC_SITEMAP_URLS = [
  ["https://byto.cl/", "weekly", "1.0"],
  ["https://byto.cl/servicios", "monthly", "0.9"],
  ["https://byto.cl/servicios/desarrollo-web", "monthly", "0.9"],
  ["https://byto.cl/servicios/tiendas-online", "monthly", "0.9"],
  ["https://byto.cl/servicios/aplicaciones-web", "monthly", "0.9"],
  ["https://byto.cl/servicios/seo", "monthly", "0.9"],
  ["https://byto.cl/servicios/google-business", "monthly", "0.9"],
  ["https://byto.cl/proyectos", "weekly", "0.9"],
  ["https://byto.cl/nosotros", "monthly", "0.7"],
  ["https://byto.cl/precios", "monthly", "0.8"],
  ["https://byto.cl/blog", "weekly", "0.8"],
  ["https://byto.cl/preguntas-frecuentes", "monthly", "0.7"],
  ["https://byto.cl/contacto", "monthly", "0.8"],
  ["https://byto.cl/privacidad", "yearly", "0.3"],
  ["https://byto.cl/terminos", "yearly", "0.3"],
] as const;

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character] ?? character);
}

async function renderSitemap() {
  let posts: Array<{ slug: string; published_at: string | null }> = [];

  try {
    const { supabase } = await import("./integrations/supabase/client");
    const { data, error } = await (supabase as any)
      .from("blog_posts")
      .select("slug,published_at")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) throw error;
    posts = data ?? [];
  } catch (error) {
    console.error("[sitemap] Could not load blog posts", error);
  }

  const staticUrls = STATIC_SITEMAP_URLS.map(
    ([loc, changefreq, priority]) =>
      `  <url><loc>${escapeXml(loc)}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
  );

  const blogUrls = posts
    .filter((post) => post.slug)
    .map((post) => {
      const lastmod = post.published_at
        ? `<lastmod>${escapeXml(new Date(post.published_at).toISOString())}</lastmod>`
        : "";
      return `  <url><loc>https://byto.cl/blog/${escapeXml(post.slug)}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.7</priority></url>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...blogUrls].join("\n")}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/sitemap.xml") return await renderSitemap();

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
