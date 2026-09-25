import type { ReactNode } from "react";

export const adminInput =
  "w-full rounded-xl border border-input bg-surface/70 px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40 focus:outline-none";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export function AdminCard({ children }: { children: ReactNode }) {
  return <div className="glass-panel space-y-3 rounded-3xl p-5">{children}</div>;
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-aurora)] px-5 py-3 font-display text-sm font-bold text-background disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/60 px-5 py-3 font-display text-sm font-semibold text-foreground"
    >
      {children}
    </button>
  );
}
