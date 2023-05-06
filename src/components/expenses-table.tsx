import { Expense } from "../types/expense";
import { Category } from "../types/category";
import { Fragment } from "react";
import { ExpenseCategoryColor } from "../enums/expense-category-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ExpensesTableProps {
  expenses: Expense[];
  categories: Category[];
  onClick: (expense: Expense) => void;
}

function ExpensesTable({ expenses, categories, onClick }: ExpensesTableProps) {
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
              "
            >
              <th className="px-4 py-3 bg-indigo">#</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody
            className="
              divide-y
              bg-white
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
                  <td className="px-4 py-3 font-bold">
                    {expenses
                      .filter(
                        (expense) => expense.category?.name === category.name
                      )
                      .reduce((acc, curr) => acc + curr.amount, 0)}{" "}
                    €
                  </td>
                  <td className="px-4 py-3"></td>
                </tr>
                {expenses
                  .filter((expense) => expense.category?.name === category.name)
                  .map((expense, index) => (
                    <tr key={expense.id}>
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{expense.description}</td>
                      <td className="px-4 py-3">{expense.date}</td>
                      <td className="px-4 py-3">{expense.amount} €</td>
                      <td className="px-4 py-3 text-center">
                        <FontAwesomeIcon
                          onClick={() => onClick(expense)}
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
      </div>
    </div>
  );
}

export default ExpensesTable;
