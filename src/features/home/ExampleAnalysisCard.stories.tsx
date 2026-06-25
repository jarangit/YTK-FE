import type { Meta, StoryObj } from '@storybook/react';
import ExampleAnalysisCard from './ExampleAnalysisCard';
import { analyticsMock } from './data/analytics.mock';
import { toHomeFeaturedAnalysis } from './homeFeaturedAnalysis';

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
    item: toHomeFeaturedAnalysis(analyticsMock[0])!,
  },
};

export const NullableFields: Story = {
  args: {
    item: toHomeFeaturedAnalysis({
      ...analyticsMock[0],
      video: {
        ...analyticsMock[0].video!,
        title: null,
        thumbnail: null,
        channelName: null,
        duration: null,
      },
      analysis: {
        ...analyticsMock[0].analysis!,
        summary: null,
      },
    })!,
  },
};
