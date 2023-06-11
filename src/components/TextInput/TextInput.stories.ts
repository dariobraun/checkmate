import { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta = {
  title: 'TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'Whatever Value',
    label: 'Label',
    placeholder: 'Enter value...',
  },
};
