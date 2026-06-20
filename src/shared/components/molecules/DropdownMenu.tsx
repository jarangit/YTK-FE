import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronDown, type LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '../atoms/Button';

export interface DropdownMenuItem {
  id: string;
  label: ReactNode;
  icon?: LucideIcon;
  disabled?: boolean;
  onSelect: () => void;
}

interface DropdownMenuProps {
  label: ReactNode;
  items: DropdownMenuItem[];
  icon?: LucideIcon;
  align?: 'start' | 'end';
  className?: string;
}

export default function DropdownMenu({
  label,
  items,
  icon,
  align = 'end',
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={clsx('relative inline-flex', className)}>
      <Button
        variant="secondary"
        size="sm"
        iconLeft={icon}
        iconRight={ChevronDown}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
      </Button>

      {open && (
        <div
          role="menu"
          className={clsx(
            'absolute top-[calc(100%+var(--space-2))] z-20 min-w-56 overflow-hidden rounded-card border border-border bg-[var(--color-bg-card)] p-1 shadow-card-hover',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-inline-sm rounded-[var(--nav-item-radius)] px-inset-sm py-stack-sm text-left text-sm font-medium text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
              >
                {Icon && <Icon className="h-4 w-4 shrink-0 text-ink-muted" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
