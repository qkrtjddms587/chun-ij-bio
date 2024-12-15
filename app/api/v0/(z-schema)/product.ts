import { z } from "zod";

export const ProductSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  unit: z.string().min(1),
  etc: z.string().optional().nullable(),
  classification1: z.string().min(1),
  classification2: z.string().min(1),
  classification3: z.string().optional().nullable(),
  standard: z.number().int().positive(),
  oem: z.string().optional().nullable(),
  isCompleted: z.boolean(),
  semiProductName: z.string().optional().nullable(),
  materials: z.array(z.object({ id: z.number().int().positive() })).optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
