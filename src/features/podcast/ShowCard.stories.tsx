import type { Meta, StoryObj } from '@storybook/react';
import ShowCard from './ShowCard';

const meta: Meta<typeof ShowCard> = {
  title: 'Molecules/ShowCard',
  component: ShowCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    category: { control: 'text' },
    meta: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShowCard>;

export const Default: Story = {
  args: {
    title: 'American English Podcast',
    category: 'Education',
    meta: 'Updated daily',
  },
};

export const HorizontalRail: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, overflow: 'auto', paddingBottom: 8, maxWidth: 800 }}>
      <ShowCard
        title="American English Podcast"
        category="Education"
        meta="Updated daily"
      />
      <ShowCard
        title="Speak English"
        category="Language Learning"
        meta="Updated weekly"
      />
      <ShowCard
        title="English Conversations"
        category="Education"
        meta="Updated every 2 days"
      />
      <ShowCard
        title="Thinking in English"
        category="Language Learning"
        meta="Updated Mon-Fri"
      />
    </div>
  ),
};
