import {
  createExpense,
  findCategoryById,
} from "../../../repositories/expenseRepository.js";

export const createExpenseService = async ({
  amount,
  description,
  categoryId,
  userId,
}) => {
  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  return createExpense({
    amount,
    description,
    categoryId,
    userId,
  });
};