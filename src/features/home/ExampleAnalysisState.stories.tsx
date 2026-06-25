import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import ExampleAnalysisState from './ExampleAnalysisState';
import { analyticsMock } from './data/analytics.mock';
import { toHomeFeaturedAnalysis } from './homeFeaturedAnalysis';

const meta: Meta<typeof ExampleAnalysisState> = {
  title: 'Features/Home/ExampleAnalysisState',
  component: ExampleAnalysisState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    item: toHomeFeaturedAnalysis(analyticsMock[0]),
    isPending: false,
    isError: false,
    onRetry: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ExampleAnalysisState>;

export const Success: Story = {};

export const Loading: Story = {
  args: {
    item: undefined,
    isPending: true,
  },
};

export const Error: Story = {
  args: {
    item: undefined,
    isError: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /try again|ลองอีกครั้ง/i }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
};

export const LoadingMobile: Story = {
  args: {
    item: undefined,
    isPending: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const ErrorMobile: Story = {
  args: {
    item: undefined,
    isError: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const SuccessWithNullableFields: Story = {
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
    }),
  },
};
