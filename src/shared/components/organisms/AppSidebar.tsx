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
          'flex flex-col items-center gap-[var(--sidebar-nav-gap)] py-[var(--sidebar-inset-y)]',
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
      <div className="flex-1 space-y-[var(--sidebar-section-gap)] overflow-y-auto px-[var(--sidebar-inset-x)] py-[var(--sidebar-inset-y)] scrollbar-thin">
        {sections.map((section, idx) => (
          <div key={idx}>
            {section.label && (
              <p className="mb-[var(--sidebar-section-label-margin-bottom)] px-[var(--sidebar-section-label-padding-x)] text-[length:var(--sidebar-section-label-size)] font-[600] uppercase tracking-[var(--sidebar-section-label-letter-spacing)] text-[var(--color-text-tertiary)]">
                {section.label}
              </p>
            )}
            <nav className="space-y-[var(--sidebar-nav-gap)]">
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
