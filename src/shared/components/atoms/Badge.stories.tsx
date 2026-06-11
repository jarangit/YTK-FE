import type { Meta, StoryObj } from '@storybook/react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent'] },
    as: { control: 'select', options: ['span', 'button'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Education',
    variant: 'default',
  },
};

export const Accent: Story = {
  args: {
    children: 'New',
    variant: 'accent',
  },
};

export const Clickable: Story = {
  args: {
    children: 'English Speaking Practice',
    variant: 'default',
    as: 'button',
  },
};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Badge>Education</Badge>
      <Badge variant="accent">Featured</Badge>
      <Badge>Kids & Family</Badge>
      <Badge variant="accent">Trending</Badge>
      <Badge>Language Learning</Badge>
    </div>
  ),
};
