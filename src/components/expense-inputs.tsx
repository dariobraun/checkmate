import React, { useState } from 'react';
import { Category } from '../types/category';
import { Expense } from '../types/expense';
import { v4 as uuidv4 } from 'uuid';

type ExpenseInputsProps = {
  categories: Category[];
  onSubmit: (expense: Expense, e: React.MouseEvent<HTMLButtonElement>) => void;
  formRef: React.RefObject<HTMLFormElement>;
};

function ExpenseInputs({ categories, onSubmit, formRef }: ExpenseInputsProps) {
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState(0);

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
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          name="categoryId"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id ?? undefined}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="text"
          name="date"
          placeholder="Date"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          type="number"
          name="amount"
          step=".01"
          placeholder="Amount"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          onClick={(e) => {
            console.log(categoryId);
            onSubmit(
              { id: uuidv4(), description, amount, date, categoryId },
              e
            );
          }}
          className="px-3 py-1 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default ExpenseInputs;
