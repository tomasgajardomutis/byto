import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
};

/** CSS scroll-driven reveal. Degrades to always-visible where unsupported. */
export function Reveal({ children, className, as, delay = 0 }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag className={cn("reveal", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
