import { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large', 'xl'],
      description: 'Overwritten size',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { value: '2023-09-19' } };

export const Large: Story = { args: { value: '2023-09-19', size: 'large' } };

export const XL: Story = { args: { value: '2023-09-19', size: 'xl' } };
