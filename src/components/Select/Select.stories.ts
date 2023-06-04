import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

interface SelectEntries {
  id: number;
  name: string;
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    // ...
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const entries: SelectEntries[] = [
  { id: 1, name: 'Cat' },
  { id: 2, name: 'Loooooooong Wiener Doggo' },
  { id: 3, name: 'Chicken' },
  { id: 4, name: 'Cow' },
  { id: 5, name: 'Snake' },
];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    displayValue: 'name',
    entries,
    onChange: () => undefined,
  },
};
