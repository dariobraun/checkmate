import React, { useEffect, useState } from 'react';
import { Expense } from '../types/expense';
import { Category } from '../types/category';
import ExpensesTable from './expenses-table';
import ExpenseInputs from './expense-inputs';
import {
  addCategory,
  addExpense,
  getAllCategories,
  getAllExpenses,
  removeCategory,
  removeExpense,
} from '../util/api.ts';

function ExpenseTracker() {
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

    addExpense(expense, setExpenses);

    formRef.current?.reset();
  };

  return (
    <>
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
      <ExpenseInputs
        categories={categories}
        onSubmit={addNewExpense}
        formRef={formRef}
      />
    </>
  );
}

export default ExpenseTracker;
