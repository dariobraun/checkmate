import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { Button } from './Button/Button';
import { ColorPicker } from './ColorPicker/ColorPicker';

interface NewCategoryInputsProps {
  index: number;
  category: Category;
  onNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onDiscard: () => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>, category: Category) => void;
}

export const NewCatetgoryInputs = ({
  category,
  onNameChange,
  onColorChange,
  onDiscard,
  onSave,
}: NewCategoryInputsProps) => {
  return (
    <tr>
      <td>
        <input
          value={category.name}
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => onNameChange(e.currentTarget.value)}
          aria-label="category name"
          className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </td>
      <td>
        <ColorPicker
          onChange={(colorValue) => onColorChange(colorValue)}
          color={category.color}
          popover={true}
        />
      </td>
      <td>
        <div className="my-2 float-right">
          <Button
            label="Discard"
            icon={faXmark}
            type="button"
            size="small"
            onClick={() => onDiscard()}
          />

          <Button
            label="Add"
            icon={faCheck}
            type="submit"
            size="small"
            onClick={(e) => onSave(e, category)}
          />
        </div>
      </td>
    </tr>
  );
};
