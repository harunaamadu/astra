"use client";

import { createContext, useContext } from "react";
import { departments as sampleDepartments } from "@/lib/constants/navigation";
import type { Department } from "@/types";

const DepartmentsContext = createContext<Department[]>(sampleDepartments);

/**
 * Hands the CMS-managed department tree (fetched once on the server in the shop layout) to the
 * client-side header components, so the mega menu, mobile menu and search filter need no props.
 */
export function DepartmentsProvider({ departments, children }: { departments: Department[]; children: React.ReactNode }) {
  return <DepartmentsContext value={departments}>{children}</DepartmentsContext>;
}

export const useDepartments = () => useContext(DepartmentsContext);
