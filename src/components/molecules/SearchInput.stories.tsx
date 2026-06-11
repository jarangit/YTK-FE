import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Find a podcast...',
  },
};

export const InSidebar: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 176, padding: 12, background: 'rgba(248, 248, 250, 0.86)', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: 'Search',
  },
};
