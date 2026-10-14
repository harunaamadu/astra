import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SignInForm } from "@/components/auth/sign-in-form";
import { safeNext } from "@/lib/auth/redirect";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function SignInPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading" className="h-72 animate-pulse rounded-lg bg-muted" />}>
      <SignInContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SignInContent({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.next) ? sp.next[0] : sp.next;
  const next = safeNext(raw);
  return (
    <>
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Welcome back. Pick up where you left off.</p>
      <SignInForm next={next} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to Astra?{" "}
        <Link href={`/sign-up${next !== "/account" ? `?next=${encodeURIComponent(next)}` : ""}`} className="text-foreground underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </>
  );
}