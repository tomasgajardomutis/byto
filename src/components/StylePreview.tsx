type Props = { previewKey: string };

/** Lightweight CSS renditions of each visual style — no image downloads. */
export function StylePreview({ previewKey }: Props) {
  switch (previewKey) {
    case "bento":
      return (
        <div className="preview-base grid grid-cols-3 grid-rows-3 gap-1.5 bg-surface p-2">
          <div className="col-span-2 row-span-2 rounded-md bg-primary/25" />
          <div className="rounded-md bg-accent/30" />
          <div className="rounded-md bg-neon/25" />
          <div className="rounded-md bg-muted" />
          <div className="rounded-md bg-muted" />
          <div className="col-span-2 rounded-md bg-primary/15" />
        </div>
      );
    case "aurora":
      return (
        <div className="preview-base bg-surface">
          <div className="aurora-blob left-[-10%] top-[-20%] h-40 w-40 bg-primary/70" />
          <div className="aurora-blob right-[-10%] bottom-[-25%] h-40 w-40 bg-accent/70" />
          <div className="absolute inset-4 flex flex-col justify-end gap-1.5 rounded-lg border border-border bg-background/40 p-3 backdrop-blur-md">
            <div className="h-2 w-2/3 rounded-full bg-foreground/70" />
            <div className="h-1.5 w-1/2 rounded-full bg-foreground/30" />
          </div>
        </div>
      );
    case "brutal":
      return (
        <div className="preview-base flex flex-col justify-center gap-2 bg-[oklch(0.9_0.2_100)] p-3">
          <div className="h-5 w-3/4 border-2 border-[oklch(0.15_0_0)] bg-[oklch(0.75_0.2_20)] shadow-[4px_4px_0_oklch(0.15_0_0)]" />
          <div className="h-3 w-1/2 border-2 border-[oklch(0.15_0_0)] bg-[oklch(0.95_0_0)]" />
          <div className="h-6 w-1/3 border-2 border-[oklch(0.15_0_0)] bg-[oklch(0.7_0.2_250)] shadow-[4px_4px_0_oklch(0.15_0_0)]" />
        </div>
      );
    case "flat":
      return (
        <div className="preview-base flex flex-col gap-2 bg-[oklch(0.98_0.005_250)] p-3">
          <div className="h-3 w-1/2 rounded-sm bg-[oklch(0.55_0.15_250)]" />
          <div className="grid flex-1 grid-cols-3 gap-2">
            <div className="rounded-sm bg-[oklch(0.9_0.02_250)]" />
            <div className="rounded-sm bg-[oklch(0.9_0.02_250)]" />
            <div className="rounded-sm bg-[oklch(0.9_0.02_250)]" />
          </div>
          <div className="h-3 w-1/4 rounded-sm bg-[oklch(0.7_0.16_160)]" />
        </div>
      );
    case "glass":
      return (
        <div className="preview-base bg-[linear-gradient(135deg,oklch(0.6_0.2_290),oklch(0.75_0.16_200))]">
          <div className="absolute inset-x-6 top-5 h-12 rounded-xl border border-white/40 bg-white/20 backdrop-blur-md" />
          <div className="absolute inset-x-10 bottom-5 h-10 rounded-xl border border-white/30 bg-white/15 backdrop-blur-md" />
        </div>
      );
    case "clay":
      return (
        <div className="preview-base flex items-center justify-center gap-3 bg-[oklch(0.93_0.04_300)]">
          <div className="h-14 w-14 rounded-3xl bg-[oklch(0.8_0.14_320)] shadow-[inset_4px_4px_8px_oklch(1_0_0/0.7),inset_-4px_-4px_8px_oklch(0.6_0.1_320/0.5),6px_8px_16px_oklch(0.6_0.1_320/0.35)]" />
          <div className="h-14 w-14 rounded-3xl bg-[oklch(0.85_0.13_200)] shadow-[inset_4px_4px_8px_oklch(1_0_0/0.7),inset_-4px_-4px_8px_oklch(0.6_0.1_200/0.5),6px_8px_16px_oklch(0.6_0.1_200/0.35)]" />
        </div>
      );
    case "neu":
      return (
        <div className="preview-base flex items-center justify-center gap-4 bg-[oklch(0.9_0.005_260)]">
          <div className="h-12 w-12 rounded-2xl bg-[oklch(0.9_0.005_260)] shadow-[6px_6px_12px_oklch(0.75_0.01_260),-6px_-6px_12px_oklch(1_0_0)]" />
          <div className="h-12 w-24 rounded-2xl bg-[oklch(0.9_0.005_260)] shadow-[inset_5px_5px_10px_oklch(0.75_0.01_260),inset_-5px_-5px_10px_oklch(1_0_0)]" />
        </div>
      );
    case "skeu":
      return (
        <div className="preview-base bg-[linear-gradient(oklch(0.45_0.06_60),oklch(0.32_0.05_55))] p-4">
          <div className="flex h-full items-center justify-center rounded-lg border border-[oklch(0.25_0.04_50)] bg-[linear-gradient(oklch(0.7_0.08_75),oklch(0.5_0.07_65))] shadow-[inset_0_1px_0_oklch(1_0_0/0.5),0_6px_14px_oklch(0.15_0_0/0.6)]">
            <div className="h-7 w-20 rounded-full border border-[oklch(0.3_0.05_50)] bg-[linear-gradient(oklch(0.85_0.06_80),oklch(0.6_0.08_65))] shadow-[inset_0_1px_0_oklch(1_0_0/0.7)]" />
          </div>
        </div>
      );
    default:
      return <div className="preview-base bg-surface-2" />;
  }
}
