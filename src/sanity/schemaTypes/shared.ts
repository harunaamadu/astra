/** Must match IconKey in src/types/index.ts and the icon map in src/lib/constants/icons.tsx. */
export const iconOptions = [
  "headphones", "laptop", "home", "shirt", "gamepad", "sparkles", "monitor", "footprints",
  "cooking-pot", "plug", "wind", "gift", "truck", "package", "clock", "speaker",
].map((value) => ({ title: value, value }));

export const heroToneOptions = [
  { title: "Amber (bold)", value: "primary" },
  { title: "Neutral", value: "neutral" },
  { title: "Dark", value: "dark" },
];

export const bannerToneOptions = [
  { title: "Amber tint", value: "primary" },
  { title: "Neutral", value: "neutral" },
];

/** Internal path ("/deals") or https URL. Anything else, such as javascript: links, is rejected. */
export const hrefValidation = (rule: { required: () => any; custom: (fn: (v: unknown) => true | string) => any }) =>
  rule.required().custom((v: string) => // NB: added string
    typeof v === "string" && ((v.startsWith("/") && !v.startsWith("//")) || /^https:\/\//.test(v))
      ? true
      : "Use a path starting with / or a full https:// URL",
  );
