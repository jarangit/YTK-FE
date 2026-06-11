import type { Meta, StoryObj } from '@storybook/react';
import SectionTitle from './SectionTitle';

const meta: Meta<typeof SectionTitle> = {
  title: 'Atoms/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: {
    title: 'Up Next',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Your Top Shows',
    subtitle: 'Based on your listening history',
  },
};

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <SectionTitle title="Up Next" />
      <SectionTitle title="Your Top Shows" subtitle="Based on your listening history" />
      <SectionTitle title="You Might Like" subtitle="Recommended for you" />
    </div>
  ),
};
