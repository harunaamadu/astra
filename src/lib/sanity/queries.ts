/**
 * GROQ queries. Projections reshape documents into the exact types the components already use,
 * so nothing outside src/lib/cms needs to know Sanity exists.
 */

const link = `{ label, href }`;
const image = `"image": image.asset->url`;

export const departmentsQuery = /* groq */ `*[_type == "department"] | order(order asc) {
  "id": deptId,
  label,
  "href": "/c/" + slug.current,
  "groups": groups[] { title, "links": links[] ${link} }
}`;

export const homeQuery = /* groq */ `*[_id == "homePage"][0] {
  "heroSlides": heroSlides[] { "id": _key, tone, headline, body, "cta": cta ${link}, icon, ${image}, badgeText, productSlug },
  "categoryTiles": categoryTiles[] { "id": _key, label, href, icon, ${image} },
  "personalOffers": personalOffers[] { "id": _key, label, note, href, icon, ${image} },
  "promoBanners": promoBanners[] { "id": _key, title, body, "cta": cta ${link}, icon, tone },
  "sponsoredShortcuts": sponsoredShortcuts[] { "id": _key, label, note, href, icon, ${image} }
}`;

const sections = (field: string) =>
  `"${field}": ${field}[] { heading, paragraphs, "items": items[] { title, text } }`;

export const blogPostsQuery = /* groq */ `*[_type == "blogPost"] | order(date desc) {
  "slug": slug.current, title, date, excerpt, ${sections("body")}
}`;

export const infoPagesQuery = /* groq */ `*[_type == "infoPage"] | order(title asc) {
  "slug": slug.current, title, description, headline, intro, ${sections("sections")}, cta
}`;

export const helpArticlesQuery = /* groq */ `*[_type == "helpArticle"] | order(order asc, title asc) {
  "slug": slug.current, title, summary, ${sections("sections")}
}`;

export const helpFaqQuery = /* groq */ `*[_id == "helpCenter"][0].faq[] { question, answer }`;

export const legalDocsQuery = /* groq */ `*[_type == "legalDoc"] | order(order asc, title asc) {
  "slug": slug.current, title, summary, updated, ${sections("sections")}
}`;

export const productContentQuery = /* groq */ `*[_type == "productContent" && productSlug == $slug][0] {
  description,
  highlights,
  "specs": specs[] { label, value },
  "faq": faq[] { question, answer },
  "images": images[] { "src": asset->url, alt }
}`;
