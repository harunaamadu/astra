import { z } from "zod";

export const searchSchema = z.object({
  q: z.string().trim().min(1, "Enter what you're looking for").max(120),
  category: z.string().trim().max(60).default("all"),
});

export type SearchInput = z.infer<typeof searchSchema>;
