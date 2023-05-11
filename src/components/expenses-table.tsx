import { Expense } from "../types/expense";
import { Category } from "../types/category";
import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

interface ExpensesTableProps {
  expenses: Expense[];
  categories: Category[];
  newCategoryInputs: Category[];
  onRemoveExpense: (expense: Expense) => void;
  onPersistCategory: (e: React.FormEvent<HTMLFormElement>) => void;
  onRemoveCategory: (category: Category) => void;
  onAddNewCategory: (newCategory: Category) => void;
  onRemoveNewCategoryInput: (category: Category) => void;
}

function ExpensesTable({
  expenses,
  categories,
  newCategoryInputs,
  onRemoveExpense,
  onPersistCategory,
  onRemoveCategory,
  onAddNewCategory,
  onRemoveNewCategoryInput,
}: ExpensesTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <form onSubmit={onPersistCategory}>
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr
                className="
                text-xs
                font-semibold
                tracking-wide
                text-left
                uppercase
                border-b
              "
              >
                <th className="px-4 py-3 bg-indigo">#</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">
                  <button
                    type="button"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded float-right"
                    onClick={() =>
                      onAddNewCategory({
                        id: null,
                        name: null,
                        color: null,
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Add Category
                  </button>
                </th>
              </tr>
            </thead>
            <tbody
              className="
              divide-y
              bg-white
            "
            >
              {newCategoryInputs.map((category, index) => (
                <tr key={index}>
                  <td>
                    <input type="text" name="name" placeholder="Name" />
                  </td>
                  <td>
                    <input type="color" name="color" placeholder="Color" />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faXmark}
                      size="lg"
                      onClick={() => onRemoveNewCategoryInput(category)}
                      className="hover:cursor-pointer text-red-500 me-2"
                    />
                    <button type="submit">
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="lg"
                        className="hover:cursor-pointer text-green-500"
                      />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.map((category) => (
                <Fragment key={category.id}>
                  <tr
                    className="text-white"
                    style={{
                      backgroundColor: category.color ?? "#6C737DFF",
                    }}
                  >
                    <td className="px-4 py-3 font-semibold">{category.name}</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 font-bold">
                      {expenses
                        .filter((expense) => expense.categoryId === category.id)
                        .reduce((acc, curr) => acc + curr.amount, 0)}{" "}
                      €
                    </td>
                    <td className="px-4 py-3 text-center">
                      <FontAwesomeIcon
                        onClick={() => onRemoveCategory(category)}
                        icon={faXmark}
                        size="lg"
                        className="hover:cursor-pointer text-rose-500"
                      />
                    </td>
                  </tr>
                  {expenses
                    .filter((expense) => expense.categoryId === category.id)
                    .map((expense, index) => (
                      <tr key={expense.id}>
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3">{expense.description}</td>
                        <td className="px-4 py-3">{expense.date}</td>
                        <td className="px-4 py-3">{expense.amount} €</td>
                        <td className="px-4 py-3 text-center">
                          <FontAwesomeIcon
                            onClick={() => onRemoveExpense(expense)}
                            icon={faXmark}
                            size="lg"
                            className="hover:cursor-pointer text-rose-500"
                          />
                        </td>
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default ExpensesTable;
