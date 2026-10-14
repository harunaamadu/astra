import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import type { SanityTag } from "@/lib/sanity/fetch";

/** Which cache tags a published/edited/deleted document type invalidates. */
const tagsByType: Record<string, SanityTag[]> = {
  department: ["sanity:department"],
  homePage: ["sanity:home"],
  blogPost: ["sanity:blog"],
  infoPage: ["sanity:info"],
  helpArticle: ["sanity:help"],
  helpCenter: ["sanity:help"],
  legalDoc: ["sanity:legal"],
  productContent: ["sanity:product"],
};

/**
 * Sanity webhook target (POST /api/revalidate). Configure it in Sanity with the same secret as
 * SANITY_REVALIDATE_SECRET and a projection of {_type}. The signature is verified before anything is purged.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });

  const tags = body?._type ? tagsByType[body._type] : undefined;
  if (!tags) return NextResponse.json({ message: "No tags for this document type", type: body?._type ?? null }, { status: 200 });

  // "max" serves the stale page once while the fresh one is built, so a publish never blocks a visitor.
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ revalidated: tags });
}
