import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return <HexColorPicker color={value} onChange={onChange} />;
};
