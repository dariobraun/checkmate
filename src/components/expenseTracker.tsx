import React, { useEffect, useState } from 'react';
import { Category } from '../types/category.ts';
import { Expense } from '../types/expense.ts';
import {
  addCategory,
  addExpense,
  getAllCategories,
  getExpensesByMonthYear,
  removeCategory,
  removeExpense,
} from '../util/api.ts';
import { DatePicker } from './DatePicker/DatePicker.tsx';
import { ExpenseInputs } from './ExpenseInputs.tsx';
import { ExpensesTable } from './ExpenseTable.tsx';

export const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );

  // Fetch expenses on date change
  useEffect(() => {
    let ignore = false;

    getExpensesByMonthYear(selectedDate).then((data) => {
      if (data && !ignore) {
        setExpenses(data);
      }
    });

    return () => {
      ignore = true;
    };
  }, [selectedDate]);

  // Fetch categories
  useEffect(() => {
    let ignore = false;

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
      const expenseAdded = addExpense(expense);
      const expensesByMonth = expenseAdded.then(() =>
        getExpensesByMonthYear(selectedDate)
      );
      expensesByMonth.then((expenses) => setExpenses(expenses));
    }

    formRef.current?.reportValidity();
    formRef.current?.reset();
  };

  return (
    <div className="px-2">
      <div className="pt-4">
        <DatePicker
          value={selectedDate}
          onChange={(value) => setSelectedDate(value)}
          size="xl"
        />
      </div>

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
          selectedDate={selectedDate}
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
