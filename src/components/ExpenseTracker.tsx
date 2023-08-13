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
import { ExpenseInputs } from '../composites/ExpenseInputs/ExpenseInputs.tsx';
import { ExpensesTable } from './ExpenseTable.tsx';
import useMobileMediaQuery from '../hooks/useMediaQuery.tsx';

export const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const isMobile = useMobileMediaQuery();

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

  const addNewExpense = (expense: Expense) => {
    if (formRef.current?.checkValidity()) {
      setExpenses([...expenses, expense]);
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

  const setSelectedDateMonth = (prevOrNextAmount: number) => {
    const newMonth = new Date(selectedDate).getMonth() + prevOrNextAmount;
    const newDate = new Date(selectedDate).setMonth(newMonth);
    const newDateWithoutTime = new Date(newDate).toISOString().split('T')[0];
    setSelectedDate(newDateWithoutTime);
  };

  const getSelectedMonth = (prevOrNextAmount: number) => {
    const newMonth = new Date(selectedDate).getMonth() + prevOrNextAmount;
    const newDate = new Date(selectedDate).setMonth(newMonth);
    return Intl.DateTimeFormat(undefined, { month: 'long' }).format(newDate);
  };

  return (
    <div>
      <div className="flex bg-slate-950">
        <button
          className="flex-1 flex justify-center items-center text-white text-4xl font-bold hover:text-yellow-500 hover:shadow-md"
          onClick={() => setSelectedDateMonth(-1)}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="me-4" />
          <span className="hidden sm:block">{getSelectedMonth(-1)}</span>
        </button>
        <div className="bg-white p-1 rounded-full">
          <DatePicker
            value={selectedDate}
            onChange={(value) => setSelectedDate(value)}
            size={isMobile ? 'large' : 'xl'}
          />
        </div>{' '}
        <button
          className="flex-1 flex justify-center items-center text-white text-4xl font-bold hover:text-yellow-500 hover:shadow-md"
          onClick={() => setSelectedDateMonth(1)}
        >
          <span className="hidden sm:block">{getSelectedMonth(1)}</span>
          <FontAwesomeIcon icon={faAngleDoubleRight} className="ms-4" />
        </button>
      </div>

      <ExpensesTable
        expenses={expenses}
        categories={categories}
        onRemoveExpense={(expense) => deleteExpense(expense)}
        onSaveCategory={(category) => {
          setCategories([...categories, category]);
          addCategory(category, setCategories);
          formRef.current?.reset();
        }}
        onRemoveCategory={(category) => deleteCategory(category)}
      />
      <div className="mx-4">
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
    </div>
  );
};
