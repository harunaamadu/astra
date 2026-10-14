"use server";

import { safeNext } from "@/lib/auth/redirect";
import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/validations/auth";

type Result =
  | { ok: true; redirectTo: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

function fieldErrorsOf(issues: { path: PropertyKey[]; message: string }[]) {
  const out: Record<string, string> = {};
  for (const i of issues) out[String(i.path[0])] ||= i.message;
  return out;
}

/**
 * DEMO: any well-formed credentials succeed and everyone already has the demo session.
 * Step 7: verify the password hash (Argon2/bcrypt) against Prisma, create the Auth.js session,
 * rate-limit by IP and email, and return the same generic error for unknown email and wrong password.
 */
export async function signInAction(input: unknown): Promise<Result> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success)
    return {
      ok: false,
      message: "Check your details and try again.",
      fieldErrors: fieldErrorsOf(parsed.error.issues),
    };
  return { ok: true, redirectTo: safeNext(parsed.data.next) };
}

export async function signUpAction(input: unknown): Promise<Result> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success)
    return {
      ok: false,
      message: "Check your details and try again.",
      fieldErrors: fieldErrorsOf(parsed.error.issues),
    };
  // TODO(step 7): hash the password, create the user, send a verification email.
  return { ok: true, redirectTo: safeNext(parsed.data.next) };
}

/** Always reports success so the form cannot be used to discover which emails have accounts. */
export async function forgotPasswordAction(
  input: unknown,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success)
    return { ok: false, message: parsed.error.issues[0].message };
  // TODO(step 7): if the account exists, email a single-use, expiring reset link.
  return { ok: true };
}
