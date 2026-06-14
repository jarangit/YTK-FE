import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: ReactNode;
  closeLabel?: string;
  className?: string;
}

export default function Drawer({
  open,
  onClose,
  children,
  title,
  closeLabel = 'Close',
  className,
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={clsx(
          'reduce-motion-transitions fixed inset-0 z-40 bg-[var(--drawer-overlay-background)] backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        aria-hidden={!open}
        inert={!open}
        className={clsx(
          'fixed right-0 top-0 z-50 h-full w-full bg-[var(--color-bg-app)] shadow-[var(--shadow-heavy)] sm:max-w-[var(--drawer-width)]',
          'reduce-motion-transitions transform transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : 'translate-x-full',
          className,
        )}
      >
        <div className="flex h-[var(--drawer-header-height)] items-center justify-between border-b border-[var(--color-border-subtle)] px-inset-lg">
          <div className="font-display text-[length:var(--app-header-control-font-size)] font-semibold uppercase tracking-[var(--drawer-title-letter-spacing)] text-[var(--color-text-tertiary)]">
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[var(--control-size-sm)] w-[var(--control-size-sm)] items-center justify-center rounded-full bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-[calc(100%-var(--drawer-header-height))] overflow-y-auto">
          {children}
        </div>
      </aside>
    </>
  );
}
