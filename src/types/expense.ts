import { Category } from './category';

export interface Expense {
  id: number;
  description: string | null;
  amount: number;
  category?: Category | null;
  date: string | null;
}
