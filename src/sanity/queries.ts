import { groq } from "next-sanity";

const live = `active != false
  && coalesce(startsAt, "1970-01-01T00:00:00Z") <= now()
  && coalesce(endsAt, "2999-01-01T00:00:00Z") > now()`;

const sections = `sections[]{ heading, paragraphs, items[]{ title, text } }`;

export const navigationQuery = groq`{
  "settings": *[_id == "siteSettings"][0]{
    utilityLinks[]{ label, href },
    subNavLinks[]{ label, href },
    popularSearches,
    footerColumns[]{ title, links[]{ label, href } },
    legalLinks[]{ label, href }
  },
  "departments": *[_type == "category" && !defined(parent)] | order(order asc, title asc){
    "slug": slug.current,
    title,
    "children": *[_type == "category" && parent._ref == ^._id] | order(order asc, title asc){
      "slug": slug.current, title, menuGroup
    }
  }
}`;

export const categoryTilesQuery = groq`*[_type == "category" && !defined(parent)] | order(order asc, title asc){
  "slug": slug.current, "label": coalesce(tileTitle, title), icon, image
}`;

export const heroSlidesQuery = groq`*[_type == "heroSlide" && ${live}] | order(order asc){
  _id, headline, body, ctaLabel, ctaHref, tone, icon, badgeText, productSlug, image
}`;

export const promoBannersQuery = groq`*[_type == "promoBanner" && active != false] | order(order asc){
  _id, title, body, ctaLabel, ctaHref, tone, icon
}`;

export const shortcutsQuery = groq`*[_type == "shortcut" && placement == $placement && ${live}] | order(order asc){
  _id, label, note, href, icon, image
}`;

export const infoPagesQuery = groq`*[_type == "infoPage" && defined(slug.current)]{
  "slug": slug.current, title, description, headline, intro, ${sections}, cta{ title, text, label, href }
}`;

export const legalDocsQuery = groq`*[_type == "legalDoc" && defined(slug.current)]{
  "slug": slug.current, title, summary, updated, ${sections}
}`;

export const blogPostsQuery = groq`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
  "slug": slug.current, title, "date": publishedAt, excerpt, "body": ${sections}
}`;

export const productContentQuery = groq`*[_type == "product" && catalogSlug == $slug][0]{
  description, highlights, specs[]{ label, value }, gallery[]{ asset, alt }, faq[]{ question, answer }
}`;
