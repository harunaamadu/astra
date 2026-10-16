import { fetchNavigation } from "@/lib/cms/content";
import { departments, popularSearches, subNavLinks, utilityLinks } from "@/lib/constants/navigation";
import { footerColumns, legalLinks } from "@/lib/constants/footer";
import type { Navigation } from "@/types/cms";

/** Each part falls back independently, so a half-filled CMS never produces an empty menu. */
export async function getNavigation(): Promise<Navigation> {
  const cms = await fetchNavigation();
  return {
    departments: cms?.departments?.length ? cms.departments : departments,
    subNavLinks: cms?.subNavLinks?.length ? cms.subNavLinks : subNavLinks,
    utilityLinks: cms?.utilityLinks?.length ? cms.utilityLinks : utilityLinks,
    popularSearches: cms?.popularSearches?.length ? cms.popularSearches : popularSearches,
    footerColumns: cms?.footerColumns?.length ? cms.footerColumns : footerColumns,
    legalLinks: cms?.legalLinks?.length ? cms.legalLinks : legalLinks,
  };
}
