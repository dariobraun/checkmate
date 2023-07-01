import { Meta, StoryObj } from '@storybook/react';
import { ExpenseInputs } from './ExpenseInputs.tsx';

const meta = {
  title: 'ExpenseInputs',
  component: ExpenseInputs,
  tags: ['autodocs'],
} satisfies Meta<typeof ExpenseInputs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categories: [{ id: 'abc123', name: 'Groceries', color: '#ffbc2a' }],
    selectedDate: new Date().toISOString().split('T')[0],
    onSubmit: (value) => console.log(value),
  },
};
