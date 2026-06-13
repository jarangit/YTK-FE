import type { Meta, StoryObj } from '@storybook/react';
import { Home, Bookmark } from 'lucide-react';
import AppShell from './AppShell';
import AppSidebar from './AppSidebar';
import HorizontalRail from './HorizontalRail';

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

function DemoTile({ title }: { title: string }) {
  return (
    <div className="h-[160px] w-[216px] shrink-0 rounded-card bg-surface p-inset-md">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-stack-xs text-xs text-ink-muted">Shared shell content</p>
    </div>
  );
}

const content = (
  <div style={{ maxWidth: 940 }}>
    <HorizontalRail title="Up Next" subtitle="Continue listening">
      <DemoTile title="First item" />
      <DemoTile title="Second item" />
      <DemoTile title="Third item" />
      <DemoTile title="Fourth item" />
    </HorizontalRail>
    <div style={{ height: 32 }} />
    <HorizontalRail title="Your Top Shows" subtitle="Based on your listening history">
      <DemoTile title="Saved item" />
      <DemoTile title="Recent item" />
      <DemoTile title="Pinned item" />
      <DemoTile title="Archived item" />
    </HorizontalRail>
  </div>
);

const demoPlayer = (
  <div className="fixed bottom-6 left-1/2 z-[var(--z-player)] flex h-[var(--mini-player-height)] min-w-[360px] -translate-x-1/2 items-center rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-white/80 px-inset-lg shadow-[var(--shadow-heavy)] backdrop-blur-xl">
    <p className="text-sm font-semibold text-ink">Demo player</p>
  </div>
);

export const Default: Story = {
  args: {
    sidebar: <AppSidebar sections={sidebarSections} activePath="/" />,
    children: content,
    player: demoPlayer,
  },
};

export const WithoutPlayer: Story = {
  args: {
    sidebar: <AppSidebar sections={sidebarSections} activePath="/" />,
    children: content,
  },
};
