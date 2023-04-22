import { ExpenseCategoryColor } from "../enums/expense-category-color";
import { ExpenseCategory } from "../enums/expense-category";

export interface Category {
  id: number;
  name: ExpenseCategory;
  color: ExpenseCategoryColor;
}
