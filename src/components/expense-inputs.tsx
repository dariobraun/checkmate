import React from 'react';
import { Category } from '../types/category';

type ExpenseInputsProps = {
  categories: Category[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef: React.RefObject<HTMLFormElement>;
};

function ExpenseInputs(props: ExpenseInputsProps) {
  return (
    <>
      <h2 className="text-lg mb-2">Add Expense</h2>
      <form onSubmit={props.onSubmit} ref={props.formRef} className="flex items-center space-x-4">
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
        />
        <select
          name="category"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="date"
          placeholder="Date"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          type="number"
          name="amount"
          step=".01"
          placeholder="Amount"
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default ExpenseInputs;
