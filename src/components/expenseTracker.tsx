import React, { useEffect, useState } from 'react';
import { Expense } from '../types/expense.ts';
import { Category } from '../types/category.ts';
import { ExpensesTable } from './ExpenseTable.tsx';
import { ExpenseInputs } from './ExpenseInputs.tsx';
import {
  addCategory,
  addExpense,
  getAllCategories,
  getAllExpenses,
  removeCategory,
  removeExpense,
} from '../util/api.ts';

export const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

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

  const addNewExpense = (
    expense: Expense,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (formRef.current?.checkValidity()) {
      addExpense(expense, setExpenses);
    }

    formRef.current?.reportValidity();
    formRef.current?.reset();
  };

  return (
    <div className="px-2">
      <ExpensesTable
        expenses={expenses}
        categories={categories}
        onRemoveExpense={(expense) =>
          removeExpense(expense, setExpenses, expenses)
        }
        onSaveCategory={(category) => {
          addCategory(category, setCategories);
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
      />
      <hr className="border-t-4 my-4" />
      {categories.length > 0 ? (
        <ExpenseInputs
          categories={categories}
          onSubmit={addNewExpense}
          formRef={formRef}
        />
      ) : (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <strong>Not Categories: </strong>
          <span>To add an expense, create a category first.</span>
        </div>
      )}
    </div>
  );
};
