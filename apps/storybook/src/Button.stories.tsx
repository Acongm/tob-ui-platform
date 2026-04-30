import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@tob-ui/ui-bridge';

const meta = {
  title: 'UI Bridge/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button'
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Create'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Cancel'
  }
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete'
  }
};
