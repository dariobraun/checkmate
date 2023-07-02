import React, { useEffect, useState } from 'react';
import { Category } from '../../types/category.ts';
import { Expense } from '../../types/expense.ts';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/Button/Button.tsx';
import { Select } from '../../components/Select/Select.tsx';
import { DatePicker } from '../../components/DatePicker/DatePicker.tsx';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type ExpenseInputsProps = {
  categories: Category[];
  selectedDate: string;
  onSubmit: (expense: Expense) => void;
  formRef?: React.RefObject<HTMLFormElement>;
};

export const ExpenseInputs = ({
  categories,
  selectedDate,
  onSubmit,
  formRef,
}: ExpenseInputsProps) => {
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');

  useEffect(() => setCategoryId(categories[0]?.id ?? ''), [categories]);
  useEffect(() => setDate(selectedDate), [selectedDate]);

  return (
    <>
      <h2 className="text-lg mb-2 text-indigo-500 font-bold">Add Expense</h2>
      <form
        ref={formRef}
        className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4"
      >
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
        <DatePicker value={date} onChange={(value) => setDate(value)} />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          name="amount"
          placeholder="Amount"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <Button
          label="Add"
          icon={faPlus}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit({
              id: uuidv4(),
              description,
              amount: parseInt(amount),
              date,
              categoryId,
            });
            setAmount('');
            setDescription('');
          }}
        />
      </form>
    </>
  );
};
