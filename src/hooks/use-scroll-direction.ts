"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [y, setY] = useState(0);
  const last = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (Math.abs(current - last.current) > threshold) {
          setDirection(current > last.current ? "down" : "up");
          last.current = current;
        }
        setY(current);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, y };
}
