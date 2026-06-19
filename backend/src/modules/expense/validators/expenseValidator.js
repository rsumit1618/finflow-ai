import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  categoryId: z.number(),
});