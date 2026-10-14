import Link from "next/link";
import { SectionHeader } from "@/components/shared/section-header";
import { ProductImage } from "@/components/product/product-image";
import type { CategoryTile } from "@/types";

export function CategoryGrid({ categories }: { categories: CategoryTile[] }) {
  return (
    <section aria-labelledby="categories" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <SectionHeader id="categories" title="Shop by category" href="/c" linkLabel="All departments" />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
        {categories.map((c) => (
          <li key={c.id}>
            <Link href={c.href} className="group block">
              <ProductImage
                src={c.image}
                alt=""
                icon={c.icon}
                className="aspect-[4/3] rounded-xl transition-colors group-hover:bg-primary/20"
                iconClassName="size-12"
              />
              <span className="mt-2 block text-sm font-medium group-hover:underline">{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
