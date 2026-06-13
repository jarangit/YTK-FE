import type { Meta, StoryObj } from '@storybook/react';
import UrlInputForm from './UrlInputForm';

const meta: Meta<typeof UrlInputForm> = {
  title: 'Features/Home/UrlInputForm',
  component: UrlInputForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 0' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UrlInputForm>;

export const Default: Story = {};

export const Compact: Story = {
  args: {
    compact: true,
  },
};
