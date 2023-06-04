import { Expense } from '../types/expense';
import { Category } from '../types/category';
import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './Button/Button';

const DEFAULT_CATEGORY_COLOR = '#2692b3';

interface ExpensesTableProps {
  expenses: Expense[];
  categories: Category[];
  onRemoveExpense: (expense: Expense) => void;
  onSaveCategory: (category: Category) => void;
  onRemoveCategory: (category: Category) => void;
}

export const ExpensesTable = ({
  expenses,
  categories,
  onRemoveExpense,
  onSaveCategory,
  onRemoveCategory,
}: ExpensesTableProps) => {
  const [newCategoryInputs, setNewCategoryInputs] = useState<Category[]>([]);

  const formRef: React.RefObject<HTMLFormElement> = React.createRef();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const categoryInputs = [...newCategoryInputs];
    categoryInputs[index][event.currentTarget.name as keyof Category] =
      event.target.value;
    setNewCategoryInputs(categoryInputs);
  };

  const addNewCategory = (
    category: { name: string; color: string },
    index: number,
    formRef: React.RefObject<HTMLFormElement>,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (formRef.current?.checkValidity()) {
      const newCategory: Category = {
        id: uuidv4(),
        name: category.name,
        color: category.color,
      };

      setNewCategoryInputs(newCategoryInputs.filter((_, i) => i !== index));

      onSaveCategory(newCategory);
    }
    formRef.current?.reportValidity();
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="w-full overflow-x-auto">
        <form ref={formRef}>
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
                  <div className="float-right">
                    <Button
                      primary={true}
                      label="Add Category"
                      icon={faPlus}
                      onClick={() =>
                        setNewCategoryInputs([
                          ...newCategoryInputs,
                          {
                            id: null,
                            name: '',
                            color: DEFAULT_CATEGORY_COLOR,
                          },
                        ])
                      }
                    />
                  </div>
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
                    <input
                      value={category.name}
                      type="text"
                      name="name"
                      placeholder="Name"
                      onChange={(e) => handleInputChange(e, index)}
                      aria-label="category name"
                      className="w-full"
                      required
                    />
                  </td>
                  <td>
                    <input
                      value={category.color}
                      type="color"
                      name="color"
                      placeholder="Color"
                      onChange={(e) => handleInputChange(e, index)}
                      aria-label="category color"
                      required
                    />
                  </td>
                  <td>
                    <div className="my-2 float-right">
                      <Button
                        label="Discard"
                        icon={faXmark}
                        type="button"
                        size="small"
                        onClick={() =>
                          setNewCategoryInputs(
                            newCategoryInputs.filter((_, i) => i !== index)
                          )
                        }
                      />

                      <Button
                        label="Add"
                        icon={faCheck}
                        type="submit"
                        size="small"
                        onClick={(e) =>
                          addNewCategory(category, index, formRef, e)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {categories.map((category) => (
                <Fragment key={category.id}>
                  <tr
                    className="text-white"
                    style={{
                      backgroundColor: category.color ?? '#6C737DFF',
                    }}
                  >
                    <td className="px-4 py-3 font-semibold">{category.name}</td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3"></td>
                    <td className="px-4 py-3 font-bold">
                      {expenses
                        .filter((expense) => expense.categoryId === category.id)
                        .reduce((acc, curr) => acc + curr.amount, 0)}{' '}
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
                        <td className="px-4 py-3">
                          {Intl.DateTimeFormat(navigator.language).format(
                            new Date(expense.date)
                          )}
                        </td>
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
};
