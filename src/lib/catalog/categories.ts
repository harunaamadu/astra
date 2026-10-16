import { getNavigation } from "@/lib/data/navigation";
import type { Department } from "@/types";
import type { Category } from "@/types/catalog";

/**
 * Built from the navigation tree (Sanity categories, or the built-in defaults),
 * so the mega menu, category pages and sitemap can never disagree.
 */
const toPath = (href: string) => href.replace(/^\/c\//, "");

function buildIndex(departments: Department[]): Map<string, Category> {
  const index = new Map<string, Category>();
  for (const d of departments) {
    const path = toPath(d.href);
    const links = d.groups.flatMap((g) => g.links);
    index.set(path, { path, label: d.label, trail: [], children: links, isLeaf: false });
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

async function index() {
  return buildIndex((await getNavigation()).departments);
}

export async function getCategory(path: string): Promise<Category | null> {
  return (await index()).get(path) ?? null;
}

export async function getAllCategoryPaths(): Promise<string[]> {
  return [...(await index()).keys()];
}

export async function getCategoryLabels(): Promise<Map<string, string>> {
  return new Map([...(await index())].map(([path, c]) => [path, c.label]));
}
