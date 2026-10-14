import { getDepartments } from "@/lib/cms/departments";
import type { Department } from "@/types";
import type { Category } from "@/types/catalog";

/**
 * Derived from the department tree (Sanity, with static fallback) so the mega menu and category
 * pages never disagree. Only links under /c/ become categories.
 */
const toPath = (href: string) => href.replace(/^\/c\//, "");
const isCategoryHref = (href: string) => href.startsWith("/c/") && href.length > 3;

function buildIndex(departments: Department[]): Map<string, Category> {
  const index = new Map<string, Category>();
  for (const d of departments) {
    const links = d.groups.flatMap((g) => g.links).filter((l) => isCategoryHref(l.href));
    if (!isCategoryHref(d.href)) continue;
    index.set(toPath(d.href), { path: toPath(d.href), label: d.label, trail: [], children: links, isLeaf: false });
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
  return index;
}

export async function getCategory(path: string): Promise<Category | null> {
  return buildIndex(await getDepartments()).get(path) ?? null;
}

export async function getAllCategoryPaths(): Promise<string[]> {
  return [...buildIndex(await getDepartments()).keys()];
}

/** path -> label, for code that needs many lookups (search scoring) without awaiting per product. */
export async function getCategoryLabels(): Promise<Map<string, string>> {
  return new Map([...buildIndex(await getDepartments())].map(([path, c]) => [path, c.label]));
}
