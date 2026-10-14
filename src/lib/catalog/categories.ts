import { departments } from "@/lib/constants/navigation";
import type { Category } from "@/types/catalog";

/**
 * Derived from the navigation tree so the mega menu and category pages never disagree.
 * Moves to Sanity (category documents with parent references) in step 5.
 */
const index = new Map<string, Category>();
const toPath = (href: string) => href.replace(/^\/c\//, "");

for (const d of departments) {
  const path = toPath(d.href);
  const links = d.groups.flatMap((g) => g.links);
  index.set(path, {
    path,
    label: d.label,
    trail: [],
    children: links,
    isLeaf: false,
  });
  for (const l of links) {
    index.set(toPath(l.href), {
      path: toPath(l.href),
      label: l.label,
      trail: [{ label: d.label, href: d.href }],
      children: [],
      isLeaf: true,
    });
  }
}

export const getCategory = (path: string): Category | null => index.get(path) ?? null;
export const getAllCategoryPaths = (): string[] => [...index.keys()];
