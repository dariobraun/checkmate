import React, { useEffect, useState } from 'react';
import { Category } from '../types/category';
import { Expense } from '../types/expense';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './Button/Button';
import { Select } from './Select/Select';

type ExpenseInputsProps = {
  categories: Category[];
  onSubmit: (expense: Expense, e: React.MouseEvent<HTMLButtonElement>) => void;
  formRef: React.RefObject<HTMLFormElement>;
};

const TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
const ISO8601_CURRENT_DATE = new Date(Date.now() - TIMEZONE_OFFSET)
  .toISOString()
  .split('T')[0];

export const ExpenseInputs = ({
  categories,
  onSubmit,
  formRef,
}: ExpenseInputsProps) => {
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(ISO8601_CURRENT_DATE);
  const [amount, setAmount] = useState(0);

  // set initial value of categoryId input
  useEffect(() => setCategoryId(categories[0]?.id ?? ''), [categories]);

  return (
    <>
      <h2 className="text-lg mb-2">Add Expense</h2>
      <form ref={formRef} className="flex items-center space-x-4">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
          placeholder="Description"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
          required
        />
        <Select
          value={categoryId}
          useValue="id"
          entries={categories}
          onChange={(value) => setCategoryId(value)}
          name="categoryId"
          required={true}
          displayValue="name"
        />
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          name="date"
          placeholder="Date"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <input
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          type="number"
          name="amount"
          step=".01"
          placeholder="Amount"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <Button
          label="Add"
          type="submit"
          onClick={(e) => {
            onSubmit(
              {
                id: uuidv4(),
                description,
                amount,
                date,
                categoryId,
              },
              e
            );
          }}
        />
      </form>
    </>
  );
};
