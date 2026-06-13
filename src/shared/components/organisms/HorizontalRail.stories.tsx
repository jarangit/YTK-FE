import type { Meta, StoryObj } from '@storybook/react';
import HorizontalRail from './HorizontalRail';

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

function DemoTile({ title }: { title: string }) {
  return (
    <div className="h-[160px] w-[216px] shrink-0 rounded-card bg-surface p-inset-md">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-stack-xs text-xs text-ink-muted">Rail child content</p>
    </div>
  );
}

export const EpisodeRail: Story = {
  args: {
    title: 'Up Next',
    subtitle: 'Continue listening',
  },
  render: (args) => (
    <HorizontalRail {...args}>
      <DemoTile title="First item" />
      <DemoTile title="Second item" />
      <DemoTile title="Third item" />
      <DemoTile title="Fourth item" />
      <DemoTile title="Fifth item" />
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
      <DemoTile title="Saved item" />
      <DemoTile title="Recent item" />
      <DemoTile title="Pinned item" />
      <DemoTile title="Archived item" />
    </HorizontalRail>
  ),
};

export const TitleOnly: Story = {
  args: {
    title: 'You Might Like',
  },
  render: (args) => (
    <HorizontalRail {...args}>
      <DemoTile title="Compact item" />
      <DemoTile title="Another item" />
    </HorizontalRail>
  ),
};
