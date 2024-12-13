import { z } from "zod";

export const RecipeSchema = z.object({
  name: z.string().min(1),
  productId: z.number().int().positive(),
  materials: z
    .array(
      z.object({
        materialId: z.number().int().positive(),
        ratio: z.number().positive(),
      })
    )
    .optional(),
  etc: z.string().optional().nullable(),
});

export type RecipeType = z.infer<typeof RecipeSchema>;
