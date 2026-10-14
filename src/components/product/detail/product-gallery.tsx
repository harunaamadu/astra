"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { ProductImage } from "@/components/product/product-image";
import { cn } from "@/lib/utils";
import type { ProductMedia } from "@/types/product";

/** Swipeable on touch, arrows on desktop, thumbnails synced to the main image. */
export function ProductGallery({ images }: { images: ProductMedia[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="space-y-3">
      <Carousel setApi={setApi} opts={{ loop: images.length > 1 }} aria-label="Product images">
        <CarouselContent className="ml-0">
          {images.map((img, i) => (
            <CarouselItem key={i} className="pl-0" aria-label={`Image ${i + 1} of ${images.length}`}>
              <ProductImage
                src={img.src}
                alt={img.alt}
                icon={img.icon}
                priority={i === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-square rounded-2xl"
                iconClassName="size-32"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-3 hidden bg-background/90 md:inline-flex" />
            <CarouselNext className="right-3 hidden bg-background/90 md:inline-flex" />
            <p aria-hidden className="absolute bottom-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-xs tabular-nums md:hidden">
              {index + 1} / {images.length}
            </p>
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-2 sm:gap-3">
          {images.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "block w-full overflow-hidden rounded-lg border-2 transition-colors",
                  i === index ? "border-foreground" : "border-transparent hover:border-border",
                )}
              >
                <ProductImage src={img.src} alt="" icon={img.icon} className="aspect-square" iconClassName="size-8" sizes="12vw" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}