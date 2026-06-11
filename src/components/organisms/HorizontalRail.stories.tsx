import type { Meta, StoryObj } from '@storybook/react';
import HorizontalRail from './HorizontalRail';
import PodcastEpisodeCard from '../molecules/PodcastEpisodeCard';
import ShowCard from '../molecules/ShowCard';

const meta: Meta<typeof HorizontalRail> = {
  title: 'Organisms/HorizontalRail',
  component: HorizontalRail,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, maxWidth: 940 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HorizontalRail>;

export const EpisodeRail: Story = {
  args: {
    title: 'Up Next',
    subtitle: 'Continue listening',
  },
  render: (args) => (
    <HorizontalRail {...args}>
      <PodcastEpisodeCard
        title="Easy English: Daily Phrases for Beginners"
        description="Simple and useful English phrases."
        channelName="Easy Natural English"
        date="Jun 10"
        duration="15 min"
        backgroundColor="#f5a623"
        textColor="#1d1d1f"
      />
      <PodcastEpisodeCard
        title="ESL Podcast 1105: Workplace Communication"
        description="Learn key phrases for professional email."
        channelName="Speak English with ESLPod.com"
        date="Jun 9"
        duration="22 min"
        backgroundColor="#4a90d9"
        textColor="#ffffff"
      />
      <PodcastEpisodeCard
        title="6 Minute English: The Future of AI"
        description="Join Neil and Sam as they discuss AI."
        channelName="BBC Learning English"
        date="Jun 8"
        duration="6 min"
        backgroundColor="#7b2ff7"
        textColor="#ffffff"
      />
      <PodcastEpisodeCard
        title="How to Stay Motivated While Learning"
        description="Practical tips to maintain momentum."
        channelName="TED Talks Daily"
        date="Jun 7"
        duration="18 min"
        backgroundColor="#e84d4d"
        textColor="#ffffff"
      />
      <PodcastEpisodeCard
        title="The Sleepy Sloth and the Moon"
        description="A calming bedtime story."
        channelName="Sleep Tight Stories"
        date="Jun 6"
        duration="25 min"
        backgroundColor="#6bb5a0"
        textColor="#ffffff"
      />
    </HorizontalRail>
  ),
};

export const ShowRail: Story = {
  args: {
    title: 'Your Top Shows',
    subtitle: 'Based on your listening history',
  },
  render: (args) => (
    <HorizontalRail {...args}>
      <ShowCard title="American English Podcast" category="Education" meta="Updated daily" />
      <ShowCard title="Speak English" category="Language Learning" meta="Updated weekly" />
      <ShowCard title="English Conversations" category="Education" meta="Updated every 2 days" />
      <ShowCard title="Thinking in English" category="Language Learning" meta="Updated Mon-Fri" />
    </HorizontalRail>
  ),
};

export const TitleOnly: Story = {
  args: {
    title: 'You Might Like',
  },
  render: (args) => (
    <HorizontalRail {...args}>
      <PodcastEpisodeCard
        title="English for Travel: At the Airport"
        description="Essential vocabulary for stress-free travel."
        channelName="Speak English with ESLPod.com"
        date="Jun 4"
        duration="20 min"
        backgroundColor="#4a90d9"
        textColor="#ffffff"
      />
      <PodcastEpisodeCard
        title="Grammar Tip: Present Perfect vs Past Simple"
        description="Clear explanation with real-life examples."
        channelName="Easy Natural English"
        date="Jun 5"
        duration="12 min"
        backgroundColor="#f5a623"
        textColor="#1d1d1f"
      />
    </HorizontalRail>
  ),
};
