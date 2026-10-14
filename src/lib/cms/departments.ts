import { departments as sampleDepartments } from "@/lib/constants/navigation";
import { sanityFetch } from "@/lib/sanity/fetch";
import { departmentsQuery } from "@/lib/sanity/queries";
import type { Department } from "@/types";

/** The category tree: mega menu, mobile menu, search filter and every /c page. Editors manage it in Sanity. */
export async function getDepartments(): Promise<Department[]> {
  const data = await sanityFetch<Department[]>(departmentsQuery, ["sanity:department"]);
  return data?.length ? data : sampleDepartments;
}
