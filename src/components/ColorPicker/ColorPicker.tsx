import { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useClickOutside from './util/useClickOutside';

const getSizeClasses = (size: 'small' | 'medium' | 'full') => {
  switch (size) {
    case 'small': {
      return 'w-[28px] h-[28px]';
    }
    case 'full': {
      return 'w-full h-[28px]';
    }
    default: {
      return 'w-[56px] h-[28px]';
    }
  }
};

interface ColorPickerProps {
  color: string;
  onChange: (value: string) => void;
  popover?: boolean;
  size?: 'small' | 'medium' | 'full';
}

export const ColorPicker = ({
  color,
  onChange,
  popover = false,
  size = 'small',
}: ColorPickerProps) => {
  const popoverRef = useRef(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popoverRef, close);

  return popover ? (
    <div className="relative">
      <div
        className={`${getSizeClasses(
          size
        )} shadow-md rounded-lg border-2 border-gray-300 cursor-pointer`}
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div
          className="absolute rounded-lg shadow-md left-0 top-[calc(100% +2px)]"
          ref={popoverRef}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  ) : (
    <HexColorPicker color={color} onChange={onChange} />
  );
};
