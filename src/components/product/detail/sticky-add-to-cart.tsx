"use client";

import { useEffect, useState, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductPrice } from "@/components/product/product-price";

type Props = {
  title: string;
  price: number;
  compareAtPrice?: number;
  disabled: boolean;
  onAdd: () => void;
  /** The in-page buttons. The bar appears once they scroll above the viewport. */
  targetRef: RefObject<HTMLElement | null>;
};

/** Mobile only. Sits above the bottom nav (3.5rem) so both stay reachable. */
export function StickyAddToCart({ title, price, compareAtPrice, disabled, onAdd, targetRef }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [targetRef]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 72, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t bg-background px-4 py-2.5 md:hidden"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">{title}</p>
            <ProductPrice price={price} compareAtPrice={compareAtPrice} />
          </div>
          <Button onClick={onAdd} disabled={disabled}>Add to cart</Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
