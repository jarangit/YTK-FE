import type { Meta, StoryObj } from '@storybook/react';
import { Home, Bookmark } from 'lucide-react';
import AppSidebar from './AppSidebar';

const meta: Meta<typeof AppSidebar> = {
  title: 'Organisms/AppSidebar',
  component: AppSidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

const sampleSections = [
  {
    items: [
      { icon: Home, label: 'Home', path: '/' },
    ],
  },
  {
    label: 'Library',
    items: [
      { icon: Bookmark, label: 'Saved', path: '/library', count: 3 },
    ],
  },
];

export const Default: Story = {
  args: {
    sections: sampleSections,
    activePath: '/',
    collapsed: false,
  },
};

export const SavedActive: Story = {
  args: {
    sections: sampleSections,
    activePath: '/library',
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    sections: sampleSections,
    activePath: '/',
    collapsed: true,
  },
};
