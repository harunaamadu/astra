"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";
import { ProductRating } from "@/components/product/product-rating";
import { ProductPrice } from "@/components/product/product-price";
import { cn } from "@/lib/utils";
import type { HeroSlide as HeroSlideType } from "@/types";

const tones = {
  primary: { wrap: "bg-primary text-primary-foreground", cta: "bg-foreground text-background hover:bg-foreground/90", blob: "bg-background/35" },
  neutral: { wrap: "bg-secondary text-secondary-foreground", cta: "bg-primary text-primary-foreground hover:bg-primary/90", blob: "bg-primary/40" },
  dark: { wrap: "bg-foreground text-background", cta: "bg-primary text-primary-foreground hover:bg-primary/90", blob: "bg-primary/25" },
} as const;

export function HeroSlide({ slide, active, priority }: { slide: HeroSlideType; active: boolean; priority?: boolean }) {
  const tone = tones[slide.tone];
  const reduce = useReducedMotion();
  const { product } = slide;

  return (
    <div className={cn("grid min-h-[34rem] items-center gap-6 overflow-hidden rounded-2xl px-6 pb-20 pt-10 md:min-h-[30rem] md:grid-cols-[1.1fr_1fr] md:px-12 md:pb-16", tone.wrap)}>
      <motion.div
        initial={false}
        animate={reduce || active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-xl"
      >
        <h2 className="text-4xl font-bold leading-[1.05] md:text-6xl">{slide.headline}</h2>
        <p className="mt-4 max-w-md text-base opacity-85 md:text-lg">{slide.body}</p>
        <Button asChild size="lg" className={cn("mt-7", tone.cta)}>
          <Link href={slide.cta.href} tabIndex={active ? 0 : -1}>{slide.cta.label}</Link>
        </Button>
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-xs items-center justify-center md:max-w-md">
        <div aria-hidden className={cn("absolute size-64 rounded-full md:size-96", tone.blob)} />
        <ProductImage
          src={product?.image ?? slide.image}
          alt={product?.title ?? slide.headline}
          icon={slide.icon}
          priority={priority}
          sizes="(min-width: 768px) 40vw, 80vw"
          className="relative aspect-square w-52 rounded-full bg-transparent md:w-80"
          iconClassName="size-28 text-current opacity-80 md:size-40"
        />
        {slide.badgeText && (
          <span className="absolute right-2 top-0 grid size-16 place-items-center rounded-full bg-background p-1 text-center text-xs font-bold leading-tight text-foreground shadow-md md:right-6">
            {slide.badgeText}
          </span>
        )}
        {product && (
          <Link
            href={`/p/${product.slug}`}
            tabIndex={active ? 0 : -1}
            className="absolute -bottom-4 left-0 w-56 rounded-xl bg-background p-3 text-left text-foreground shadow-lg md:-left-2"
          >
            <p className="line-clamp-2 text-sm font-medium">{product.title}</p>
            <div className="mt-1"><ProductRating rating={product.rating} reviewCount={product.reviewCount} /></div>
            <div className="mt-1"><ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} /></div>
          </Link>
        )}
      </div>
    </div>
  );
}
