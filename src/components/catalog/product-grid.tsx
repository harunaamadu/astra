import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";
import type { ViewMode } from "@/types/catalog";
import { ProductListItem } from "./product-list-item";

export function ProductGrid({ products, view }: { products: Product[]; view: ViewMode }) {
  if (view === "list") {
    return (
      <ul className="space-y-3" aria-label="Products">
        {products.map((p) => <li key={p.id}><ProductListItem product={p} /></li>)}
      </ul>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4 xl:grid-cols-4" aria-label="Products">
      {products.map((p, i) => (
        <li key={p.id} className="min-w-0"><ProductCard product={p} priority={i < 4} /></li>
      ))}
    </ul>
  );
}
