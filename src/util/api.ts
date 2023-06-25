import { Category } from '../types/category.ts';
import { Expense } from '../types/expense.js';

export const getAllExpenses = async (): Promise<Expense[] | undefined> => {
  try {
    const res = await fetch('/.netlify/functions/expense-get-all');
    const jsonData: { data: Expense[] } = await res.json();

    return jsonData.data;
  } catch (error) {
    console.log(error);
  }
};

export const getExpensesByMonthYear = async (
  dateInput: string
): Promise<Expense[]> => {
  try {
    const res = await fetch(
      `/.netlify/functions/expenses-get-by-month-year?dateInput=${dateInput}`
    );
    const jsonData: { data: Expense[] } = await res.json();

    return jsonData.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch('/.netlify/functions/category-get-all');
    const jsonData: { data: Category[] } = await res.json();

    return jsonData.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addExpense = async (expense: Expense) => {
  try {
    await fetch('/.netlify/functions/expense-create', {
      body: JSON.stringify(expense),
      method: 'POST',
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCategory = async (
  category: Category,
  setCategories: (categories: Category[]) => void
) => {
  try {
    await fetch('/.netlify/functions/category-create', {
      body: JSON.stringify(category),
      method: 'POST',
    });

    const allCategories = await getAllCategories();
    if (allCategories) {
      setCategories(allCategories);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeExpense = async (
  expense: Expense,
  setExpenses: (expenses: Expense[]) => void,
  expenses: Expense[]
) => {
  setExpenses(expenses.filter((ex) => ex.id !== expense.id));
  try {
    await fetch('/.netlify/functions/expense-delete', {
      body: JSON.stringify(expense),
      method: 'POST',
    });

    const allExpenses = await getAllExpenses();
    if (allExpenses) {
      setExpenses(allExpenses);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeCategory = async (
  category: Category,
  setExpenses: (expenses: Expense[]) => void,
  setCategories: (categories: Category[]) => void,
  expenses: Expense[],
  categories: Category[]
) => {
  setExpenses(expenses.filter((ex) => ex.categoryId !== category.id));
  setCategories(categories.filter((cat) => cat.id !== category.id));
  try {
    await fetch('/.netlify/functions/category-delete', {
      body: JSON.stringify(category),
      method: 'POST',
    });

    const allExpenses = await getAllExpenses();
    const allCategories = await getAllCategories();
    if (allExpenses && allCategories) {
      setExpenses(allExpenses);
      setCategories(allCategories);
    }
  } catch (error) {
    console.log(error);
  }
};
