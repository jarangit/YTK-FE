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
    <div className="w-[var(--sidebar-width)] p-[var(--sidebar-inset-x)]">
      <div className="flex flex-col gap-[var(--sidebar-nav-gap)]">
        <SidebarNavItem icon={Home} label="Home" active />
        <SidebarNavItem icon={Compass} label="New" />
      </div>
      <div className="mt-[var(--sidebar-section-gap)]">
        <p className="mb-[var(--sidebar-section-label-margin-bottom)] px-[var(--sidebar-section-label-padding-x)] text-[11px] font-[600] uppercase tracking-[0.02em] text-[var(--color-text-tertiary)]">
          Library
        </p>
        <SidebarNavItem icon={Clock} label="Recently Updated" />
        <SidebarNavItem icon={Library} label="Shows" />
      </div>
    </div>
  ),
};
