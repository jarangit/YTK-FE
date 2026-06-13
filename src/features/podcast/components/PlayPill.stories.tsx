import type { Meta, StoryObj } from '@storybook/react';
import PlayPill from './PlayPill';

const meta: Meta<typeof PlayPill> = {
  title: 'Features/Podcast/PlayPill',
  component: PlayPill,
  tags: ['autodocs'],
  argTypes: {
    duration: { control: 'text' },
    isPlaying: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PlayPill>;

export const Duration: Story = {
  args: {
    duration: '15 min',
    isPlaying: false,
  },
};

export const Playing: Story = {
  args: {
    duration: '15 min',
    isPlaying: true,
  },
};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <PlayPill duration="6 min" />
      <PlayPill duration="22 min" isPlaying />
      <PlayPill duration="18 min" />
      <PlayPill duration="45 min" isPlaying />
    </div>
  ),
};

export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#7b2ff7', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    duration: '15 min',
  },
};
