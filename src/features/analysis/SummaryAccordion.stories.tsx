import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { mockVideos } from '../result/data/mockVideos';
import SummaryAccordion from './SummaryAccordion';

const meta: Meta<typeof SummaryAccordion> = {
  title: 'Features/Analysis/SummaryAccordion',
  component: SummaryAccordion,
  tags: ['autodocs'],
  args: {
    summary: mockVideos[0].summary,
  },
};

export default meta;
type Story = StoryObj<typeof SummaryAccordion>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};
