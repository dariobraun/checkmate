import { faCheck, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { Button } from './Button/Button';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { TextInput } from './TextInput/TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NewCategoryInputsProps {
  index: number;
  category: Category;
  onNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onDiscard: () => void;
  onSave: (category: Category) => void;
}

export const NewCatetgoryInputs = ({
  category,
  onNameChange,
  onColorChange,
  onDiscard,
  onSave,
}: NewCategoryInputsProps) => {
  return (
    <tr
      style={{
        backgroundColor: category.color ?? '#6C737DFF',
      }}
    >
      <td className="p-3">
        <div className="mx-4">
          <TextInput
            value={category.name}
            onChange={onNameChange}
            placeholder="Enter category name..."
            required={true}
          />
        </div>
      </td>
      <td className="p-3">
        <div className="mx-4">
          <ColorPicker
            onChange={(colorValue) => onColorChange(colorValue)}
            color={category.color}
            popover={true}
            size="full"
          />
        </div>
      </td>
      <td className="p-3"></td>
      <td className="p-3"></td>
      <td className="rounded-r-full text-center p-3">
        <div className="my-2 whitespace-nowrap">
          <FontAwesomeIcon
            onClick={() => onSave(category)}
            icon={faCheck}
            size="xl"
            className="hover:cursor-pointer text-white hover:text-green-500 me-2"
          />

          <FontAwesomeIcon
            onClick={() => onDiscard()}
            icon={faTimes}
            size="xl"
            className="hover:cursor-pointer text-white hover:text-rose-500"
          />
        </div>
      </td>
    </tr>
  );
};
