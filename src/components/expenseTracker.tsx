import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    new Date().toISOString().split('T')[0]
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

  const deleteExpense = (expense: Expense) => {
    setExpenses(expenses.filter((ex) => ex.id !== expense.id));
    const expenseRemoved = removeExpense(expense);
    expenseRemoved.then(() => getExpensesByMonthYear(selectedDate));
  };

  const deleteCategory = (category: Category) => {
    setExpenses(expenses.filter((ex) => ex.categoryId !== category.id));
    setCategories(categories.filter((cat) => cat.id !== category.id));

    const categoryRemoved = removeCategory(category);
    const categoriesFetched = categoryRemoved.then(() => getAllCategories);
    categoriesFetched.then(() => getExpensesByMonthYear(selectedDate));
  };

  const previousOrNextMonth = (prevOrNext: -1 | 1) => {
    const previousMonth = new Date(selectedDate).getMonth() + prevOrNext;
    const newDate = new Date(selectedDate).setMonth(previousMonth);
    setSelectedDate(new Date(newDate).toISOString());
  };

  const getPreviousOrNextMonth = (prevOrNext: -1 | 1) => {
    const previousMonth = new Date(selectedDate).getMonth() + prevOrNext;
    const newDate = new Date(selectedDate).setMonth(previousMonth);
    return Intl.DateTimeFormat(undefined, { month: 'long' }).format(newDate);
  };

  return (
    <div className="px-2">
      <div className="mt-4 flex bg-indigo-500">
        <div
          className="flex-1 flex justify-center items-center text-white text-4xl cursor-pointer font-bold hover:text-yellow-500"
          onClick={() => previousOrNextMonth(-1)}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="me-4" />
          <span>{getPreviousOrNextMonth(-1)}</span>
        </div>
        <div className="bg-white p-1 rounded-full">
          <DatePicker
            value={selectedDate}
            onChange={(value) => setSelectedDate(value)}
            size="xl"
          />
        </div>{' '}
        <div
          className="flex-1 flex justify-center items-center text-white text-4xl cursor-pointer font-bold hover:text-yellow-500"
          onClick={() => previousOrNextMonth(1)}
        >
          <span>{getPreviousOrNextMonth(1)}</span>
          <FontAwesomeIcon icon={faAngleDoubleRight} className="ms-4" />
        </div>
      </div>

      <ExpensesTable
        expenses={expenses}
        categories={categories}
        onRemoveExpense={(expense) => deleteExpense(expense)}
        onSaveCategory={(category) => {
          addCategory(category, setCategories);
          formRef.current?.reset();
        }}
        onRemoveCategory={(category) => deleteCategory(category)}
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
          <strong>No categories: </strong>
          <span>To add an expense, create a category first.</span>
        </div>
      )}
    </div>
  );
};
