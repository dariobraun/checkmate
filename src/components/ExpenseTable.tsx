import { faPlus, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../types/category';
import { Expense } from '../types/expense';
import { Button } from './Button/Button';
import { NewCatetgoryInputs } from './NewCategoryInputs';
import useMobileMediaQuery from '../hooks/useMediaQuery';

const DEFAULT_CATEGORY_COLOR = '#6366f1';

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
  const isMobile = useMobileMediaQuery();

  const formRef: React.RefObject<HTMLFormElement> = React.createRef();

  const handleCategoryNameChange = (name: string, index: number): void => {
    const categoryInputs = [...newCategoryInputs];
    categoryInputs[index].name = name;
    setNewCategoryInputs(categoryInputs);
  };
  const handleCategoryColorChange = (color: string, index: number): void => {
    const categoryInputs = [...newCategoryInputs];
    categoryInputs[index].color = color;
    setNewCategoryInputs(categoryInputs);
  };

  const addNewCategory = (
    category: { name: string; color: string },
    index: number,
    formRef: React.RefObject<HTMLFormElement>
  ) => {
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
    <div className="w-full rounded-lg shadow-xs">
      <div className="w-full">
        <form ref={formRef}>
          <table className="w-full whitespace-no-wrap table-fixed">
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
                <th className="p-3">{isMobile ? '' : '#'}</th>
                <th className="p-3">{isMobile ? '' : 'Description'}</th>
                <th className="p-3">{isMobile ? '' : 'Date'}</th>
                <th className="p-3">{isMobile ? '' : 'Amount'}</th>
                <th className="p-3">
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
              bg-white
            "
            >
              {newCategoryInputs.map((category, index) => (
                <NewCatetgoryInputs
                  category={category}
                  index={index}
                  onNameChange={(name) => handleCategoryNameChange(name, index)}
                  onColorChange={(color) =>
                    handleCategoryColorChange(color, index)
                  }
                  onDiscard={() =>
                    setNewCategoryInputs(
                      newCategoryInputs.filter((_, i) => i !== index)
                    )
                  }
                  onSave={(category) =>
                    addNewCategory(category, index, formRef)
                  }
                  key={index}
                />
              ))}
              {categories.map((category) => (
                <Fragment key={category.id}>
                  <tr
                    className="text-white"
                    style={{
                      backgroundColor: category.color ?? '#6C737DFF',
                    }}
                  >
                    <td className="p-3 font-semibold">{category.name}</td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                    <td className="p-3 font-bold whitespace-nowrap">
                      {expenses
                        .filter((expense) => expense.categoryId === category.id)
                        .reduce((acc, curr) => acc + curr.amount, 0)}{' '}
                      €
                    </td>
                    <td className="p-4 text-center rounded-r-full">
                      <FontAwesomeIcon
                        onClick={() => onRemoveCategory(category)}
                        icon={faTrashCan}
                        size="lg"
                        className="hover:cursor-pointer text-white hover:text-rose-500"
                      />
                    </td>
                  </tr>
                  {expenses
                    .filter((expense) => expense.categoryId === category.id)
                    .map((expense, index) => (
                      <tr key={expense.id} className="border-t-2">
                        <td className="p-3">{isMobile ? '' : index + 1}</td>
                        <td className="p-3">{expense.description}</td>
                        <td className="p-3">
                          {isMobile
                            ? ''
                            : Intl.DateTimeFormat(navigator.language).format(
                                new Date(expense.date)
                              )}
                        </td>
                        <td className="p-3">{expense.amount} €</td>
                        <td className="p-3 text-center">
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
