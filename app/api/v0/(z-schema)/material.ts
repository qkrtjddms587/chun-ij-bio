import { z } from "zod";

export const MaterialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  classification1: z.string().min(1, "Classification1 is required"),
  classification2: z.string().min(1, "Classification2 is required"),
  classification3: z.string().optional().nullable(),
  unit: z.string().min(1, "Unit is required"),
  etc: z.string().optional().nullable(),
});

export type MaterialType = z.infer<typeof MaterialSchema>;
