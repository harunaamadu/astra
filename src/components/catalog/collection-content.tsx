import { parseCategoryQuery } from "@/lib/catalog/query";
import {
  getCollectionListing,
  type CollectionSource,
} from "@/lib/data/collections";
import type { NavLink } from "@/types";
import { ListingView } from "./listing-view";

type Props = {
  source: CollectionSource;
  title: string;
  description?: string;
  basePath: string;
  trail?: NavLink[];
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/** Call inside <Suspense>: it reads searchParams. */
export async function CollectionContent({
  source,
  title,
  description,
  basePath,
  trail,
  searchParams,
}: Props) {
  const query = parseCategoryQuery(await searchParams);
  const listing = await getCollectionListing(source, query);
  return (
    <ListingView
      title={title}
      description={description}
      trail={trail}
      current={title}
      listing={listing}
      query={query}
      basePath={basePath}
    />
  );
}
