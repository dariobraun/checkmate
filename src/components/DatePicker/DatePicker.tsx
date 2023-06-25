import React, { RefObject } from 'react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const inputRef: RefObject<HTMLInputElement> = React.createRef();
  return (
    <div
      className="bg-white border-2 border-indigo-500 rounded-full p-1 w-fit cursor-pointer"
      onClick={() => inputRef.current?.showPicker()}
    >
      <input
        type="date"
        value={value}
        ref={inputRef}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="focus:outline-none bg-transparent text-sm cursor-pointer"
      ></input>
    </div>
  );
};
