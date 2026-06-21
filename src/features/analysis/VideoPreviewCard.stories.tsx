import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bookmark } from 'lucide-react';
import VideoPreviewCard from './VideoPreviewCard';
import { mockVideos } from '../result/data/mockVideos';
import { Button } from '../../shared/components/atoms/Button';

const meta: Meta<typeof VideoPreviewCard> = {
  title: 'Features/Analysis/VideoPreviewCard',
  component: VideoPreviewCard,
  tags: ['autodocs'],
  args: {
    video: mockVideos[0],
    size: 'l',
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['s', 'm', 'l'],
    },
    action: {
      control: false,
    },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof VideoPreviewCard>;

function MockAction() {
  return (
    <Button variant="secondary" size="sm" iconLeft={Bookmark}>
      Save
    </Button>
  );
}

export const Large: Story = {
  args: {
    size: 'l',
    action: <MockAction />,
  },
};

export const Medium: Story = {
  args: {
    size: 'm',
    action: <MockAction />,
  },
};

export const Small: Story = {
  args: {
    size: 's',
    action: <MockAction />,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-6">
      <VideoPreviewCard {...args} size="l" action={<MockAction />} />
      <VideoPreviewCard {...args} size="m" action={<MockAction />} />
      <div className="max-w-[32rem]">
        <VideoPreviewCard {...args} size="s" action={<MockAction />} />
      </div>
    </div>
  ),
};
