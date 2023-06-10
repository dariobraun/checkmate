import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types/category';
import { Button } from './Button/Button';

interface NewCategoryInputsProps {
  index: number;
  category: Category;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDiscard: () => void;
  onSave: (e: React.MouseEvent<HTMLButtonElement>, category: Category) => void;
}

export const NewCatetgoryInputs = ({
  category,
  onChange,
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
          onChange={(e) => onChange(e)}
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
          onChange={(e) => onChange(e)}
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
