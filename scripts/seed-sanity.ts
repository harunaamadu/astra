/**
 * Copies the storefront's static sample content into Sanity so editors start from what the site
 * already shows. Safe to re-run: documents use fixed ids and are replaced, never duplicated.
 *
 *   npm run sanity:seed -- --dry    print what would be written
 *   npm run sanity:seed             write to the dataset in .env.local
 *
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN
 * (an Editor token from sanity.io/manage). Prices, stock and variants are not seeded: they stay in code.
 */
import { createClient } from "@sanity/client";
import { buildDocuments } from "./seed-documents";

const dry = process.argv.includes("--dry");

async function main() {
  const docs = await buildDocuments();
  const counts = docs.reduce<Record<string, number>>((n, d) => {
    const type = String(d._type);
    n[type] = (n[type] ?? 0) + 1;
    return n;
  }, {});
  console.log(`${docs.length} documents:`, counts);
  if (dry) return console.log("Dry run, nothing written.");

  const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset, SANITY_API_WRITE_TOKEN: token } = process.env;
  if (!projectId || !token) {
    throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.");
  }

  const client = createClient({
    projectId,
    dataset: dataset || "production",
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01",
    token,
    useCdn: false,
  });

  let tx = client.transaction();
  for (const doc of docs) tx = tx.createOrReplace(doc as { _id: string; _type: string });
  await tx.commit();
  console.log(`Wrote ${docs.length} documents to ${projectId}/${dataset || "production"}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
