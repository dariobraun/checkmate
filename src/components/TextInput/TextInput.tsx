interface TextInputProps {
  value: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export const TextInput = ({
  value,
  label,
  placeholder,
  required = false,
  onChange,
}: TextInputProps) => {
  return (
    <label className="text-xs text-indigo-500">
      {label}
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
        aria-label={label}
        className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
        required={required}
      />
    </label>
  );
};
