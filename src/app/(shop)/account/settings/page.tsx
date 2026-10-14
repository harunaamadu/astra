import type { Metadata } from "next";
import { ProfileForm } from "@/components/account/profile-form";
import { requireSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Account settings", robots: { index: false } };

export default async function SettingsPage() {
  const session = await requireSession("/account/settings");
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold md:text-3xl">Settings</h1>
      <section aria-labelledby="profile" className="rounded-2xl border p-6">
        <h2 id="profile" className="mb-4 text-lg font-semibold">Profile</h2>
        <ProfileForm defaults={{ name: session.name, email: session.email }} />
      </section>
    </div>
  );
}