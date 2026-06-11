import type { Meta, StoryObj } from '@storybook/react';
import MiniPlayer from './MiniPlayer';

const meta: Meta<typeof MiniPlayer> = {
  title: 'Molecules/MiniPlayer',
  component: MiniPlayer,
  tags: ['autodocs'],
  argTypes: {
    isPlaying: { control: 'boolean' },
    title: { control: 'text' },
    channelName: { control: 'text' },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 200, position: 'relative', background: '#f7f7f8', borderRadius: 12, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MiniPlayer>;

export const Paused: Story = {
  args: {
    isPlaying: false,
    title: 'Easy English: Daily Phrases for Beginners',
    channelName: 'Easy Natural English',
    progress: 0.35,
  },
};

export const Playing: Story = {
  args: {
    isPlaying: true,
    title: '6 Minute English: The Future of AI',
    channelName: 'BBC Learning English',
    progress: 0.65,
  },
};

export const LongTitle: Story = {
  args: {
    isPlaying: true,
    title: 'ESL Podcast 1105: Workplace Communication and Professional Email Etiquette',
    channelName: 'Speak English with ESLPod.com',
    progress: 0.2,
  },
};
