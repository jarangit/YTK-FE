import type { Meta, StoryObj } from '@storybook/react';
import { Heart, Play, Plus, Share2 } from 'lucide-react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['ghost', 'filled'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const GhostHeart: Story = {
  args: {
    icon: Heart,
    ariaLabel: 'Add to favorites',
    variant: 'ghost',
    size: 'md',
  },
};

export const FilledPlay: Story = {
  args: {
    icon: Play,
    ariaLabel: 'Play',
    variant: 'filled',
    size: 'md',
  },
};

export const FilledPlus: Story = {
  args: {
    icon: Plus,
    ariaLabel: 'Add',
    variant: 'filled',
    size: 'sm',
  },
};

export const GhostShare: Story = {
  args: {
    icon: Share2,
    ariaLabel: 'Share',
    variant: 'ghost',
    size: 'sm',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton icon={Heart} ariaLabel="Heart" variant="ghost" />
      <IconButton icon={Play} ariaLabel="Play" variant="filled" />
      <IconButton icon={Plus} ariaLabel="Add" variant="filled" size="sm" />
      <IconButton icon={Share2} ariaLabel="Share" variant="ghost" size="sm" />
    </div>
  ),
};
