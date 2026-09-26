import type { ReactNode } from "react";
import { AuroraBackground } from "@/components/AuroraBackground";
import { CursorHalo } from "@/components/CursorHalo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Reveal } from "@/components/Reveal";

export function ContentPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <><AuroraBackground/><CursorHalo/><Navbar/><main className="px-5 pb-24 pt-32 md:pt-40"><div className="mx-auto max-w-6xl"><Reveal><p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p><h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-tight md:text-6xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{intro}</p></Reveal><div className="mt-14">{children}</div></div></main><Footer/><WhatsAppFab/></>;
}
