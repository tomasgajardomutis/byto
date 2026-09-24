import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { projectsQuery } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import novaImg from "@/assets/project-nova.jpg";
import kaiaImg from "@/assets/project-kaia.jpg";
import rutaImg from "@/assets/project-ruta.jpg";

const fallbacks = [novaImg, kaiaImg, rutaImg];

export function PortfolioSection() {
  const { data: projects = [] } = useQuery(projectsQuery);

  return (
    <section id="portafolio" className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portafolio"
          title="Proyectos que ya están en línea"
          subtitle="Diseño, velocidad y resultados medibles en cada entrega."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const image = project.image_url || fallbacks[i % fallbacks.length];
            const tags = project.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean);
            const Wrapper = project.link_url ? "a" : "div";
            return (
              <Reveal key={project.id} delay={i * 80}>
                <Wrapper
                  {...(project.link_url
                    ? { href: project.link_url, target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="aurora-border glass-panel group block h-full overflow-hidden rounded-3xl"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={image}
                      alt={project.title}
                      loading="lazy"
                      width={1200}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_55%)]" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                      {project.link_url && (
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    {tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs text-muted-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
