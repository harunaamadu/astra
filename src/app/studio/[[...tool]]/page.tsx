import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

/** Embedded Sanity Studio at /studio. Sign-in and permissions are handled by Sanity. */
export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <NextStudio config={config} />;
}
