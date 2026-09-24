import { Reveal } from "@/components/Reveal";

type Props = { eyebrow: string; title: string; subtitle?: string };

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </Reveal>
  );
}
