import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductDetail } from "@/types/product";
import { ProductSpecs } from "./product-specs";
import { ProductReviews } from "./product-reviews";
import { ProductFaq } from "./product-faq";

/** Server component: the shadcn Tabs shell is client-side, the panels render on the server. */
export function ProductTabs({ product }: { product: ProductDetail }) {
  return (
    <section
      id="details"
      aria-label="Product details"
      className="scroll-mt-28 pt-12"
    >
      <Tabs defaultValue="info">
        <div className="overflow-x-auto scrollbar-none">
          <TabsList className="h-auto w-max justify-start gap-1 bg-transparent p-0" variant="line">
            {[
              ["info", "Product information"],
              [
                "reviews",
                `Reviews (${new Intl.NumberFormat("en-US").format(product.reviewCount)})`,
              ],
              ["faq", "FAQ"],
            ].map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-b-primary data-[state=active]:bg-primary/15! data-[state=active]:shadow-none data-[state=active]:text-primary-foreground data-[state=active]:font-semibold"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="border-t pt-8">
          <TabsContent value="info">
            <ProductSpecs product={product} />
          </TabsContent>
          <TabsContent value="reviews">
            <ProductReviews
              summary={product.reviews.summary}
              items={product.reviews.items}
              slug={product.slug}
            />
          </TabsContent>
          <TabsContent value="faq">
            <ProductFaq faq={product.faq} />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
