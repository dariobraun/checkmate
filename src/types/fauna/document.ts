import { Expense } from "../expense.ts";

export interface Document {
  ref: any;
  ts: string;
  data: Expense;
}
