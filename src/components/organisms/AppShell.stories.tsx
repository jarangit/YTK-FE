import type { Meta, StoryObj } from '@storybook/react';
import { Home, Bookmark } from 'lucide-react';
import AppShell from './AppShell';
import AppSidebar from './AppSidebar';
import MiniPlayer from '../molecules/MiniPlayer';
import HorizontalRail from './HorizontalRail';
import PodcastEpisodeCard from '../molecules/PodcastEpisodeCard';
import ShowCard from '../molecules/ShowCard';

const sidebarSections = [
  {
    items: [{ icon: Home, label: 'Home', path: '/' }],
  },
  {
    label: 'Library',
    items: [{ icon: Bookmark, label: 'Saved', path: '/library' }],
  },
];

const meta: Meta<typeof AppShell> = {
  title: 'Organisms/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

const content = (
  <div style={{ maxWidth: 940 }}>
    <HorizontalRail title="Up Next" subtitle="Continue listening">
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
        description="Practical tips to maintain your learning momentum."
        channelName="TED Talks Daily"
        date="Jun 7"
        duration="18 min"
        backgroundColor="#e84d4d"
        textColor="#ffffff"
      />
    </HorizontalRail>
    <div style={{ height: 32 }} />
    <HorizontalRail title="Your Top Shows" subtitle="Based on your listening history">
      <ShowCard title="American English Podcast" category="Education" meta="Updated daily" />
      <ShowCard title="Speak English" category="Language Learning" meta="Updated weekly" />
      <ShowCard title="English Conversations" category="Education" meta="Updated every 2 days" />
      <ShowCard title="Thinking in English" category="Language Learning" meta="Updated Mon-Fri" />
    </HorizontalRail>
  </div>
);

export const Default: Story = {
  args: {
    sidebar: <AppSidebar sections={sidebarSections} activePath="/" />,
    children: content,
    player: <MiniPlayer />,
  },
};

export const WithoutPlayer: Story = {
  args: {
    sidebar: <AppSidebar sections={sidebarSections} activePath="/" />,
    children: content,
  },
};
