import { Expense } from "../types/expense";
import { Category } from "../types/category";
import { Fragment } from "react";
import { ExpenseCategoryColor } from "../enums/expense-category-color";

interface ExpensesTableProps {
  expenses: Expense[];
  categories: Category[];
}

function ExpensesTable({ expenses, categories }: ExpensesTableProps) {
  function getGradient(color: ExpenseCategoryColor) {
    switch (color) {
      case ExpenseCategoryColor.BLUE:
        return "from-blue-500";
      case ExpenseCategoryColor.GREEN:
        return "from-green-500";
      case ExpenseCategoryColor.ORANGE:
        return "from-orange-500";
    }
  }

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
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
                dark:border-gray-700
                bg-gray-50
                dark:bg-gray-800
              "
            >
              <th className="px-4 py-3 bg-indigo">#</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Categorie</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody
            className="
              divide-y
              dark:divide-gray-700
              bg-white
              dark:bg-gray-800
            "
          >
            {categories.map((category) => (
              <Fragment key={category.id}>
                <tr
                  className={"bg-gradient-to-r " + getGradient(category.color)}
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    {category.name}
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 font-bold">
                    {expenses
                      .filter(
                        (expense) => expense.category?.name === category.name
                      )
                      .reduce((acc, curr) => acc + curr.amount, 0)}{" "}
                    €
                  </td>
                </tr>
                {expenses
                  .filter((expense) => expense.category?.name === category.name)
                  .map((expense, index) => (
                    <tr
                      key={expense.id}
                      className="
                  hover:bg-gray-100
                  dark:hover:bg-gray-600
                "
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{expense.description}</td>
                      <td className="px-4 py-3">{expense.category?.name}</td>
                      <td className="px-4 py-3">{expense.date}</td>
                      <td className="px-4 py-3">{expense.amount} €</td>
                    </tr>
                  ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpensesTable;
