import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  count?: number;
  onClick?: () => void;
  className?: string;
}

export default function SidebarNavItem({
  icon: Icon,
  label,
  active = false,
  collapsed = false,
  count,
  onClick,
  className,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center gap-2.5 w-full rounded-[var(--nav-item-radius)] transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        active
          ? 'bg-[var(--color-accent)] text-white font-[600]'
          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]',
        collapsed ? 'justify-center h-[var(--nav-item-height)] px-0' : 'h-[var(--nav-item-height)] px-2',
        className,
      )}
      title={collapsed ? label : undefined}
    >
      <Icon size={18} />
      {!collapsed && (
        <span className="flex-1 text-[13px] leading-none text-left">{label}</span>
      )}
      {!collapsed && count !== undefined && (
        <span className={clsx(
          'text-[11px] font-[500]',
          active ? 'text-white/70' : 'text-[var(--color-text-tertiary)]',
        )}>
          {count}
        </span>
      )}
    </button>
  );
}
