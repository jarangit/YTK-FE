import type { Meta, StoryObj } from '@storybook/react';
import AppHeader from '../../shared/components/AppHeader';
import HomePage from './HomePage';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
  render: () => (
    <>
      <AppHeader />
      <HomePage />
    </>
  ),
};
