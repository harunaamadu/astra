import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

type Payload = { _type?: string; slug?: string };

/**
 * Called by a Sanity webhook on publish, update and delete.
 * Webhook projection:  { _type, "slug": coalesce(slug.current, catalogSlug) }
 * Clears the cache entries tagged for that document type (and that slug, when there is one),
 * so edits appear within seconds instead of waiting for the cache to expire.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Webhook secret is not configured" }, { status: 500 });

  try {
    const { isValidSignature, body } = await parseBody<Payload>(req, secret);
    if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    if (!body?._type) return NextResponse.json({ message: "Missing _type" }, { status: 400 });

    const tags = [`sanity:${body._type}`];
    if (body.slug) tags.push(`sanity:${body._type}:${body.slug}`);
    for (const tag of tags) revalidateTag(tag, "max");

    return NextResponse.json({ revalidated: tags });
  } catch (error) {
    console.error("Sanity revalidation failed", error);
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }
}
