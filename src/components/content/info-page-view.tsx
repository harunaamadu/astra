import { CtaBanner } from "./cta-banner";
import { ContentSections } from "./content-sections";
import { PageShell } from "./page-shell";
import type { InfoPage } from "@/types/content";

export function InfoPageView({ page }: { page: InfoPage }) {
  return (
    <PageShell title={page.headline} intro={page.intro} width="wide">
      <div className="space-y-12">
        <ContentSections sections={page.sections} />
        {page.cta && <CtaBanner {...page.cta} />}
      </div>
    </PageShell>
  );
}
