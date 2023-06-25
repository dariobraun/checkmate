import React, { RefObject, useMemo } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  size?: 'small' | 'large' | 'xl';
}
export const DatePicker = ({
  value,
  onChange,
  size = 'small',
}: DatePickerProps) => {
  const inputRef: RefObject<HTMLInputElement> = React.createRef();

  const computedContainerClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'px-2 p-1';
      case 'large':
        return 'px-3 p-1';
      default:
        return 'px-4 p-2';
    }
  }, [size]);

  const computedInputClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-xl ';
    }
  }, [size]);

  return (
    <div
      className={`${computedContainerClasses} bg-white border-2 border-indigo-500 rounded-full w-fit cursor-pointer`}
      onClick={() => inputRef.current?.showPicker()}
    >
      <input
        type="date"
        value={value}
        ref={inputRef}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={`${computedInputClasses} focus:outline-none bg-transparent cursor-pointer`}
      ></input>
    </div>
  );
};
