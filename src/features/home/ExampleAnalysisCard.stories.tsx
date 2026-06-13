import type { Meta, StoryObj } from '@storybook/react';
import ExampleAnalysisCard from './ExampleAnalysisCard';
import { mockVideos } from '../result/data/mockVideos';

const meta: Meta<typeof ExampleAnalysisCard> = {
  title: 'Features/Home/ExampleAnalysisCard',
  component: ExampleAnalysisCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ExampleAnalysisCard>;

export const Default: Story = {
  args: {
    video: mockVideos[0],
  },
};
