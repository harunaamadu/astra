"use server";

import { newsletterSchema } from "@/lib/validations/newsletter";

type Result = { ok: true } | { ok: false; message: string };

export async function subscribeNewsletter(input: unknown): Promise<Result> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };

  // TODO(step 6): prisma.subscriber.upsert({ where: { email }, ... }) and trigger the welcome email.
  return { ok: true };
}
