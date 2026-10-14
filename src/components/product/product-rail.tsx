import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { SectionHeader } from "@/components/shared/section-header";
import { ProductCard } from "./product-card";
import type { Product } from "@/types";

type Props = { id: string; title: string; href?: string; products: Product[] };

export function ProductRail({ id, title, href, products }: Props) {
  return (
    <section aria-labelledby={id} className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <SectionHeader id={id} title={title} href={href} />
      <Carousel opts={{ align: "start", dragFree: true }} aria-label={title}>
        <CarouselContent className="-ml-3 md:ml-0 md:grid md:grid-cols-3 md:gap-4 lg:grid-cols-5">
          {products.map((product, i) => (
            <CarouselItem key={product.id} className="basis-[62%] pl-3 sm:basis-[38%] md:basis-auto md:pl-0">
              <ProductCard product={product} priority={i === 0 && id === "picked"} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 hidden sm:inline-flex md:hidden" />
        <CarouselNext className="right-1 hidden sm:inline-flex md:hidden" />
      </Carousel>
    </section>
  );
}
