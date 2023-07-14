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
    <label className="text-xs text-slate-950">
      {label}
      <input
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
        aria-label={label}
        className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-950 focus:border-slate-950 p-2"
        required={required}
      />
    </label>
  );
};
