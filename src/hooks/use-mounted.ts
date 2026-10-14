"use client";

import { useEffect, useState } from "react";

/** Guards persisted-store reads (cart count, wishlist) against hydration mismatches. */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
