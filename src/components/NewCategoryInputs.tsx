import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { Button } from './Button/Button';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { TextInput } from './TextInput/TextInput';

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
    <tr className="bg-gray-100">
      <td></td>
      <td>
        <TextInput
          value={category.name}
          onChange={onNameChange}
          placeholder="Enter category name..."
          required={true}
        />
      </td>
      <td>
        <ColorPicker
          onChange={(colorValue) => onColorChange(colorValue)}
          color={category.color}
          popover={true}
          size="full"
        />
      </td>
      <td>
        <div className="my-2">
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
      <td className="rounded-r-full"></td>
    </tr>
  );
};
