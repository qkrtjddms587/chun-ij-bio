import { z } from "zod";

export const MaterialStockSchema = z.object({
  quantity: z.number().int(),
});

export type MaterialType = z.infer<typeof MaterialStockSchema>;
