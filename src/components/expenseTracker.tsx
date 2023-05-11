import React, { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { Category } from "../types/category";
import ExpensesTable from "./expenses-table";
import ExpenseInputs from "./expense-inputs";
import { Document } from "../types/fauna/document.ts";
import { v4 as uuidv4 } from "uuid";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryInputs, setNewCategoryInputs] = useState<Category[]>([]);

  useEffect(() => {
    let ignore = false;

    getAllExpenses().then((data) => {
      if (data && !ignore) {
        setExpenses(data);
      }
    });

    getAllCategories().then((data) => {
      if (data && !ignore) {
        setCategories(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  const formRef: React.RefObject<HTMLFormElement> = React.createRef();

  // TODO: Move to service component
  const getAllCategories = async () => {
    try {
      const res = await fetch("/.netlify/functions/category-get-all");
      const jsonData: { data: Document<Category>[] } = await res.json();

      return jsonData.data.map((document) => document.data);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: Move to service component
  const getAllExpenses = async () => {
    try {
      const res = await fetch("/.netlify/functions/expense-get-all");
      const jsonData: { data: Document<Expense>[] } = await res.json();

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
  const addCategory = async (category: Category) => {
    try {
      await fetch("/.netlify/functions/category-create", {
        body: JSON.stringify(category),
        method: "POST",
      });

      const allCategories = await getAllCategories();
      if (allCategories) {
        setCategories(allCategories);
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

  const removeCategory = async (category: Category) => {
    setExpenses(expenses.filter((ex) => ex.categoryId !== category.id));
    setCategories(categories.filter((cat) => cat.id !== category.id));
    try {
      await fetch("/.netlify/functions/category-delete", {
        body: JSON.stringify(category),
        method: "POST",
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

  const addNewExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form.entries());

    const newExpense: Expense = {
      id: uuidv4(),
      amount: parseInt(formData.amount as string, 10),
      date: formData.date as string,
      description: formData.description as string,
      categoryId: formData.categoryId as string,
    };

    addExpense(newExpense);

    formRef.current?.reset();
  };

  const addNewCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form.entries());

    const newCategory: Category = {
      id: uuidv4(),
      name: formData.name as string,
      color: formData.color as string,
    };

    addCategory(newCategory);

    formRef.current?.reset();
  };

  const removeNewCategoryInput = (categoryInput: {
    name: string | null;
    color: string | null;
  }) => {
    setNewCategoryInputs(
      newCategoryInputs.filter((input) => input !== categoryInput)
    );
  };

  return (
    <>
      <ExpensesTable
        expenses={expenses}
        categories={categories}
        onRemoveExpense={removeExpense}
        onPersistCategory={addNewCategory}
        onRemoveCategory={removeCategory}
        newCategoryInputs={newCategoryInputs}
        onRemoveNewCategoryInput={removeNewCategoryInput}
        onAddNewCategory={(categoryInput) =>
          setNewCategoryInputs([...newCategoryInputs, categoryInput])
        }
      />
      <hr className="border-t-4 my-4" />
      <ExpenseInputs
        categories={categories}
        onSubmit={addNewExpense}
        formRef={formRef}
      />
    </>
  );
}

export default ExpenseTracker;
