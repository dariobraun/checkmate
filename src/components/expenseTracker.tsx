import React, { useState } from "react";
import { Expense } from "../types/expense";
import { Category } from "../types/category";
import ExpensesTable from "./expenses-table";
import ExpenseInputs from "./expense-inputs";
import { ExpenseCategory } from "../enums/expense-category";
import { ExpenseCategoryColor } from "../enums/expense-category-color";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: ExpenseCategory.GROCERIES,
      color: ExpenseCategoryColor.BLUE,
    },
    {
      id: 2,
      name: ExpenseCategory.DRUGSTORE,
      color: ExpenseCategoryColor.GREEN,
    },
    {
      id: 3,
      name: ExpenseCategory.LEISURE,
      color: ExpenseCategoryColor.ORANGE,
    },
  ]);

  const formRef: React.RefObject<HTMLFormElement> = React.createRef();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Math.random(),
      amount: Number(e.currentTarget.amount.value),
      date: e.currentTarget.date.value,
      description: e.currentTarget.description.value,
      category: categories.find(
        (category) => Number(e.currentTarget.category.value) === category.id
      ),
    };

    setExpenses([...expenses, newExpense]);
    formRef.current?.reset();
  };

  return (
    <>
      <ExpensesTable expenses={expenses} categories={categories} />
      <hr className="border-t-4 my-4" />
      <ExpenseInputs
        categories={categories}
        onSubmit={handleSubmit}
        formRef={formRef}
      />
    </>
  );
}

export default ExpenseTracker;
