import type { Meta, StoryObj } from '@storybook/react';
import { Home, Compass, Library, Clock } from 'lucide-react';
import SidebarNavItem from './SidebarNavItem';

const meta: Meta<typeof SidebarNavItem> = {
  title: 'Molecules/SidebarNavItem',
  component: SidebarNavItem,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    collapsed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarNavItem>;

export const Inactive: Story = {
  args: {
    icon: Home,
    label: 'Home',
    active: false,
  },
};

export const Active: Story = {
  args: {
    icon: Home,
    label: 'Home',
    active: true,
  },
};

export const Collapsed: Story = {
  args: {
    icon: Home,
    label: 'Home',
    collapsed: true,
  },
};

export const CollapsedActive: Story = {
  args: {
    icon: Home,
    label: 'Home',
    active: true,
    collapsed: true,
  },
};

export const SidebarList: Story = {
  render: () => (
    <div style={{ width: 176, padding: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <SidebarNavItem icon={Home} label="Home" active />
        <SidebarNavItem icon={Compass} label="New" />
      </div>
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 11, color: '#aeaeb2', fontWeight: 600, padding: '0 8px', marginBottom: 4, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          Library
        </p>
        <SidebarNavItem icon={Clock} label="Recently Updated" />
        <SidebarNavItem icon={Library} label="Shows" />
      </div>
    </div>
  ),
};
