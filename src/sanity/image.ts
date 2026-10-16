import { dataset, projectId } from "./env";

type SanityImageSource = { asset?: { _ref?: string } | null } | null | undefined;

/**
 * Builds a Sanity CDN URL from an image field without extra dependencies.
 * Asset refs look like "image-<id>-<width>x<height>-<format>".
 * Crop and hotspot are ignored; use object-contain (as ProductImage does) or add @sanity/image-url later.
 */
export function imageUrl(source: SanityImageSource, width = 800): string | undefined {
  const ref = source?.asset?._ref;
  if (!ref) return undefined;
  const match = /^image-([A-Za-z0-9]+)-(\d+x\d+)-([a-z]+)$/.exec(ref);
  if (!match) return undefined;
  const [, id, dims, ext] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dims}.${ext}?w=${width}&auto=format&q=80&fit=max`;
}
