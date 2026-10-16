import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export function generateStaticParams() {
  return [{ tool: [] as string[] }];
}

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24">
        <h1 className="text-2xl font-semibold">Sanity isn&apos;t configured yet</h1>
        <p className="mt-2 text-muted-foreground">
          Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local, restart the dev server,
          and reload this page. See docs/CMS.md.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
