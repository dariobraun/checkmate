import React, { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { Category } from "../types/category";
import ExpensesTable from "./expenses-table";
import ExpenseInputs from "./expense-inputs";
import { ExpenseCategory } from "../enums/expense-category";
import { ExpenseCategoryColor } from "../enums/expense-category-color";
import { Document } from "../types/fauna/document.ts";

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

  useEffect(() => {
    getAllExpenses().then((data) => {
      if (data) {
        setExpenses(data);
      }
    });
  }, []);

  const formRef: React.RefObject<HTMLFormElement> = React.createRef();

  // TODO: Move to service component
  const getAllExpenses = async () => {
    try {
      const res = await fetch("/.netlify/functions/expense-get-all");
      const jsonData: { data: Document[] } = await res.json();

      return jsonData.data.map((document) => document.data);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Move to service component
  const addExpense = async (expense: Expense) => {
    try {
      await fetch("/.netlify/functions/expense-create", {
        body: JSON.stringify(expense),
        method: "POST",
      });

      const allExpenses = await getAllExpenses();
      if (allExpenses) {
        setExpenses(allExpenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Move to service component
  // const getExpense = async (expense: Expense) => {
  //   try {
  //     const res = await fetch("/.netlify/functions/expense-get", {
  //       body: JSON.stringify(expense),
  //       method: "POST",
  //     });
  //
  //     await res.json().then(console.log);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // TODO: Move to service component
  const removeExpense = async (expense: Expense) => {
    setExpenses(expenses.filter((ex) => ex.id !== expense.id));
    try {
      await fetch("/.netlify/functions/expense-delete", {
        body: JSON.stringify(expense),
        method: "POST",
      });

      const allExpenses = await getAllExpenses();
      if (allExpenses) {
        setExpenses(allExpenses);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

    addExpense(newExpense);

    formRef.current?.reset();
  };

  return (
    <>
      <ExpensesTable
        expenses={expenses}
        categories={categories}
        onClick={removeExpense}
      />
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
