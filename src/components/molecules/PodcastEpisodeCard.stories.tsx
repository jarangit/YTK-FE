import type { Meta, StoryObj } from '@storybook/react';
import PodcastEpisodeCard from './PodcastEpisodeCard';

const meta: Meta<typeof PodcastEpisodeCard> = {
  title: 'Molecules/PodcastEpisodeCard',
  component: PodcastEpisodeCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    channelName: { control: 'text' },
    date: { control: 'text' },
    duration: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    isPlaying: { control: 'boolean' },
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
type Story = StoryObj<typeof PodcastEpisodeCard>;

export const Default: Story = {
  args: {
    title: 'Easy English: Daily Phrases for Beginners',
    description: 'Simple and useful English phrases for everyday conversations.',
    channelName: 'Easy Natural English',
    date: 'Jun 10',
    duration: '15 min',
    backgroundColor: '#f5a623',
    textColor: '#1d1d1f',
  },
};

export const Playing: Story = {
  args: {
    title: '6 Minute English: The Future of AI',
    description: 'Join Neil and Sam as they discuss artificial intelligence and its impact.',
    channelName: 'BBC Learning English',
    date: 'Jun 8',
    duration: '6 min',
    backgroundColor: '#7b2ff7',
    textColor: '#ffffff',
    isPlaying: true,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'ESL Podcast 1105: Workplace Communication and Professional Email Etiquette Tips',
    description: 'Learn key phrases for professional email and meeting etiquette in the workplace.',
    channelName: 'Speak English with ESLPod.com',
    date: 'Jun 9',
    duration: '22 min',
    backgroundColor: '#4a90d9',
    textColor: '#ffffff',
  },
};

export const HorizontalRail: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, overflow: 'auto', paddingBottom: 8, maxWidth: 940 }}>
      <PodcastEpisodeCard
        title="Easy English: Daily Phrases for Beginners"
        description="Simple and useful English phrases for everyday conversations."
        channelName="Easy Natural English"
        date="Jun 10"
        duration="15 min"
        backgroundColor="#f5a623"
        textColor="#1d1d1f"
      />
      <PodcastEpisodeCard
        title="ESL Podcast 1105: Workplace Communication"
        description="Learn key phrases for professional email and meeting etiquette."
        channelName="Speak English with ESLPod.com"
        date="Jun 9"
        duration="22 min"
        backgroundColor="#4a90d9"
        textColor="#ffffff"
      />
      <PodcastEpisodeCard
        title="6 Minute English: The Future of AI"
        description="Join Neil and Sam as they discuss artificial intelligence."
        channelName="BBC Learning English"
        date="Jun 8"
        duration="6 min"
        backgroundColor="#7b2ff7"
        textColor="#ffffff"
      />
      <PodcastEpisodeCard
        title="How to Stay Motivated While Learning"
        description="Practical tips to maintain your language learning momentum."
        channelName="TED Talks Daily"
        date="Jun 7"
        duration="18 min"
        backgroundColor="#e84d4d"
        textColor="#ffffff"
      />
    </div>
  ),
};
