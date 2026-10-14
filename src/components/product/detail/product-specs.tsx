import type { ProductDetail } from "@/types/product";

export function ProductSpecs({ product }: { product: ProductDetail }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h3 className="mb-2 text-lg font-semibold">About this item</h3>
        <p className="text-muted-foreground">{product.description}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm">
          {product.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold">Specifications</h3>
        <dl className="divide-y rounded-xl border text-sm">
          {product.specs.map((s) => (
            <div key={s.label} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-2.5">
              <dt className="text-muted-foreground">{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
