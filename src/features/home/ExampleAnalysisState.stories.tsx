import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { mockVideos } from '../result/data/mockVideos';
import ExampleAnalysisState from './ExampleAnalysisState';

const meta: Meta<typeof ExampleAnalysisState> = {
  title: 'Features/Home/ExampleAnalysisState',
  component: ExampleAnalysisState,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    video: mockVideos[0],
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
    video: undefined,
    isPending: true,
  },
};

export const Error: Story = {
  args: {
    video: undefined,
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
    video: undefined,
    isPending: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};

export const ErrorMobile: Story = {
  args: {
    video: undefined,
    isError: true,
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
