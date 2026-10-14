"use server";

import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { getProductsByIds as findProducts } from "@/lib/data/products";
import { profileSchema } from "@/lib/validations/auth";
import type { Product } from "@/types";

export async function getProductsByIds(ids: unknown): Promise<Product[]> {
  const parsed = z.array(z.string().max(100)).max(100).safeParse(ids);
  return parsed.success ? findProducts(parsed.data) : [];
}

export async function updateProfile(input: unknown): Promise<{ ok: true } | { ok: false; message: string }> {
  const session = await getSession();
  if (!session) return { ok: false, message: "Please sign in again." };
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };
  // TODO(step 6): prisma.user.update({ where: { id: session.userId }, data: parsed.data })
  return { ok: true };
}
