import type { IconKey } from "@/types";

export const iconKeys = [
  "headphones", "laptop", "home", "shirt", "gamepad", "sparkles", "monitor", "footprints",
  "cooking-pot", "plug", "wind", "gift", "truck", "package", "clock", "speaker",
] as const satisfies readonly IconKey[];

/** CMS values are untrusted: anything unknown falls back instead of crashing the icon lookup. */
export const asIconKey = (value: unknown, fallback: IconKey = "sparkles"): IconKey =>
  (iconKeys as readonly string[]).includes(value as string) ? (value as IconKey) : fallback;
