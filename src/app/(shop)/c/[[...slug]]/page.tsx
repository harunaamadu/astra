import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingView } from "@/components/catalog/listing-view";
import { SubcategoryChips } from "@/components/catalog/subcategory-chips";
import { DepartmentsIndex } from "@/components/catalog/departments-index";
import { CategorySkeleton } from "@/components/catalog/category-skeleton";
import { getAllCategoryPaths, getCategory } from "@/lib/catalog/categories";
import { parseCategoryQuery } from "@/lib/catalog/query";
import { getCategoryListing } from "@/lib/data/catalog";

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  return (await getAllCategoryPaths()).map((path) => ({ slug: path.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const path = slug.join("/");
  if (!path)
    return { title: "All departments", alternates: { canonical: "/c" } };

  const category = await getCategory(path);
  if (!category) return { title: "Category not found" };
  return {
    title: category.label,
    description: `Shop ${category.label.toLowerCase()} on Astra. Compare prices, ratings and sellers, and filter to find the right one.`,
    // Filter and sort URLs all point back to the clean category URL.
    alternates: { canonical: `/c/${path}` },
  };
}

/** Synchronous shell. params and searchParams are read inside <Suspense> so navigation stays instant. */
export default function CategoryPage(props: Props) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent {...props} />
    </Suspense>
  );
}

async function CategoryContent({ params, searchParams }: Props) {
  const { slug = [] } = await params;
  const path = slug.join("/");
  if (!path) return <DepartmentsIndex />;

  const category = await getCategory(path);
  if (!category) notFound();

  const query = parseCategoryQuery(await searchParams);
  const listing = await getCategoryListing(category, query);

  return (
    <ListingView
      title={category.label}
      trail={category.trail}
      current={category.label}
      header={<SubcategoryChips links={category.children} />}
      listing={listing}
      query={query}
      basePath={`/c/${path}`}
    />
  );
}