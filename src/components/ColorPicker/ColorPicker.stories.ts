import { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from './ColorPicker';

const meta = { title: 'ColorPicker', component: ColorPicker } satisfies Meta<
  typeof ColorPicker
>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: '#fffff' },
};
