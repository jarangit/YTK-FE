import { type LucideIcon } from 'lucide-react';
import SidebarNavItem from '../molecules/SidebarNavItem';
import clsx from 'clsx';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  count?: number;
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

interface AppSidebarProps {
  sections: NavSection[];
  activePath: string;
  collapsed?: boolean;
  onNavigate?: (path: string) => void;
  className?: string;
}

export default function AppSidebar({
  sections,
  activePath,
  collapsed = false,
  onNavigate,
  className,
}: AppSidebarProps) {
  if (collapsed) {
    return (
      <aside
        className={clsx(
          'fixed left-0 top-0 bottom-0 z-[var(--z-sidebar)]',
          'w-[var(--sidebar-collapsed-width)]',
          'bg-[var(--color-bg-sidebar)] backdrop-blur-xl',
          'border-r border-[var(--color-border-subtle)]',
          'flex flex-col items-center gap-1 py-4',
          className,
        )}
      >
        {sections.flatMap((section) =>
          section.items.map((item) => (
            <SidebarNavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              active={activePath === item.path}
              collapsed
              onClick={() => onNavigate?.(item.path)}
            />
          )),
        )}
      </aside>
    );
  }

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 bottom-0 z-[var(--z-sidebar)]',
        'w-[var(--sidebar-width)]',
        'bg-[var(--color-bg-sidebar)] backdrop-blur-xl',
        'border-r border-[var(--color-border-subtle)]',
        'flex flex-col',
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scrollbar-thin">
        {sections.map((section, idx) => (
          <div key={idx}>
            {section.label && (
              <p className="px-2 text-[11px] font-[600] tracking-[0.02em] uppercase text-[var(--color-text-tertiary)] mb-1">
                {section.label}
              </p>
            )}
            <nav className="space-y-0.5">
              {section.items.map((item) => (
                <SidebarNavItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  active={activePath === item.path}
                  count={item.count}
                  onClick={() => onNavigate?.(item.path)}
                />
              ))}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
