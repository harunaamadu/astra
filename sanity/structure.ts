import type { StructureResolver } from "sanity/structure";
import { singletonTypes } from "./schemaTypes";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().id(type).title(title).child(S.document().schemaType(type).documentId(type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "homePage", "Home page"),
      singleton(S, "helpCenter", "Help center FAQ"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !(singletonTypes as readonly string[]).includes(item.getId() ?? ""),
      ),
    ]);
