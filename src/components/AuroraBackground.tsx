import { useEffect, useRef } from "react";

/**
 * Parallax aurora layers. Blobs move at different speeds on scroll
 * using a single rAF-throttled transform write (no layout thrash).
 */
export function AuroraBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-speed]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      for (const layer of layers) {
        const speed = Number(layer.dataset["speed"] ?? 0);
        layer.style.setProperty("--parallax", `${(y * speed).toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-background" />
      <div
        data-speed="0.18"
        className="aurora-blob drift left-[-18%] top-[-12%] h-[32rem] w-[32rem] bg-primary/50"
        style={{ translate: "0 var(--parallax, 0px)" }}
      />
      <div
        data-speed="0.32"
        className="aurora-blob drift right-[-14%] top-[8%] h-[28rem] w-[28rem] bg-accent/55"
        style={{ translate: "0 var(--parallax, 0px)", animationDelay: "-6s" }}
      />
      <div
        data-speed="0.12"
        className="aurora-blob drift left-[20%] top-[55%] h-[26rem] w-[26rem] bg-neon/25"
        style={{ translate: "0 var(--parallax, 0px)", animationDelay: "-11s" }}
      />
      <div
        data-speed="0.24"
        className="aurora-blob drift right-[10%] top-[120%] h-[30rem] w-[30rem] bg-accent/35"
        style={{ translate: "0 var(--parallax, 0px)", animationDelay: "-3s" }}
      />
      <div className="grain-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,var(--background)_78%)]" />
    </div>
  );
}
