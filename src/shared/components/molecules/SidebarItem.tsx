import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  count?: number;
  onClick?: () => void;
  className?: string;
}

export default function SidebarItem({
  icon: Icon,
  label,
  active = false,
  collapsed = false,
  count,
  onClick,
  className,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex w-full items-center gap-[var(--nav-item-gap)] rounded-[var(--nav-item-radius)] transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        active
          ? 'bg-[var(--color-text-primary)] text-[var(--color-text-inverse)] font-[600]'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]',
        collapsed
          ? 'h-[var(--nav-item-height)] justify-center px-0'
          : 'h-[var(--nav-item-height)] px-[var(--nav-item-padding-x)]',
        className,
      )}
      title={collapsed ? label : undefined}
    >
      <Icon size="var(--nav-item-icon-size)" />
      {!collapsed && (
        <span className="flex-1 text-left text-[length:var(--nav-item-label-size)] leading-none">
          {label}
        </span>
      )}
      {!collapsed && count !== undefined && (
        <span className={clsx(
          'text-[length:var(--nav-item-count-size)] font-[500]',
          active ? 'text-white/70' : 'text-[var(--color-text-tertiary)]',
        )}>
          {count}
        </span>
      )}
    </button>
  );
}
