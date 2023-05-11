import React, { useEffect, useState } from "react";
import { Expense } from "../types/expense";
import { Category } from "../types/category";
import ExpensesTable from "./expenses-table";
import ExpenseInputs from "./expense-inputs";
import { v4 as uuidv4 } from "uuid";
import {
  addCategory,
  addExpense,
  getAllCategories,
  getAllExpenses,
  removeCategory,
  removeExpense,
} from "../util/api.ts";

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

    addExpense(newExpense, setExpenses);

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

    addCategory(newCategory, setCategories);
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
        onRemoveExpense={(expense) =>
          removeExpense(expense, setExpenses, expenses)
        }
        onPersistCategory={(category) => {
          addNewCategory(category);
          formRef.current?.reset();
        }}
        onRemoveCategory={(category) =>
          removeCategory(
            category,
            setExpenses,
            setCategories,
            expenses,
            categories
          )
        }
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
