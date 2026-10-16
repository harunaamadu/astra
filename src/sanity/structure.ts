import type { StructureResolver } from "sanity/structure";

/** Editors see content grouped by where it appears on the site. Site settings is a single document. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Astra")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Homepage")
        .child(
          S.list().title("Homepage").items([
            S.documentTypeListItem("heroSlide").title("Hero slides"),
            S.documentTypeListItem("promoBanner").title("Promo banners"),
            S.documentTypeListItem("shortcut").title("Shortcut tiles"),
          ]),
        ),
      S.listItem()
        .title("Catalog")
        .child(
          S.list().title("Catalog").items([
            S.documentTypeListItem("category").title("Categories"),
            S.documentTypeListItem("product").title("Product content"),
          ]),
        ),
      S.listItem()
        .title("Pages")
        .child(
          S.list().title("Pages").items([
            S.documentTypeListItem("infoPage").title("Info pages"),
            S.documentTypeListItem("legalDoc").title("Legal documents"),
            S.documentTypeListItem("blogPost").title("Blog posts"),
          ]),
        ),
    ]);
