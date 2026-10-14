import { redirect } from "next/navigation";

export type Session = { userId: string; name: string; email: string };

/**
 * DEMO SESSION. Every visitor is signed in as "Haruna" so account pages can be built and reviewed.
 * Step 7 replaces getSession() with Auth.js (auth()) and returns null for guests.
 * Because the real version reads cookies, callers must run inside <Suspense> (they already do).
 */
const demoSession: Session = { userId: "demo-user", name: "Haruna", email: "harunaamadu@gmail.com" };

export async function getSession(): Promise<Session | null> {
  return demoSession;
}

export async function requireSession(next: string): Promise<Session> {
  const session = await getSession();
  if (!session) redirect(`/sign-in?next=${encodeURIComponent(next)}`);
  return session;
}
