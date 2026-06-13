import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SlideDrawer({ isOpen, onClose, children }: SlideDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-[var(--drawer-overlay-background)] backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={clsx(
          'fixed right-0 top-0 z-50 h-full w-full bg-[var(--color-bg-app)] shadow-[var(--shadow-heavy)] sm:max-w-[var(--drawer-width)]',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-[var(--drawer-header-height)] items-center justify-between border-b border-[var(--color-border-subtle)] px-inset-lg">
          <span className="font-display text-[length:var(--app-header-control-font-size)] font-semibold uppercase tracking-[var(--drawer-title-letter-spacing)] text-[var(--color-text-tertiary)]">
            Detail
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-[var(--control-size-sm)] w-[var(--control-size-sm)] items-center justify-center rounded-full bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="h-[calc(100%-var(--drawer-header-height))] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
