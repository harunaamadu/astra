import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { safeNext } from "@/lib/auth/redirect";

export const metadata: Metadata = { title: "Create account", robots: { index: false } };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default function SignUpPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div role="status" aria-label="Loading" className="h-96 animate-pulse rounded-lg bg-muted" />}>
      <SignUpContent searchParams={searchParams} />
    </Suspense>
  );
}

async function SignUpContent({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.next) ? sp.next[0] : sp.next;
  const next = safeNext(raw);
  return (
    <>
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Track orders, save favorites and check out faster.</p>
      <SignUpForm next={next} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-foreground underline underline-offset-4">Sign in</Link>
      </p>
    </>
  );
}