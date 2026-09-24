import { useEffect, useRef, useState } from "react";

/**
 * Desktop: a smooth halo that trails the pointer.
 * Touch: renders nothing; a subtle tap ripple is handled by button styles.
 */
export function CursorHalo() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(fine.matches && !reduced.matches);
    const onChange = () => setEnabled(fine.matches && !reduced.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const loop = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el.style.setProperty("--cursor-x", `${x.toFixed(1)}px`);
      el.style.setProperty("--cursor-y", `${y.toFixed(1)}px`);
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} aria-hidden="true" className="cursor-halo hidden md:block" />;
}
