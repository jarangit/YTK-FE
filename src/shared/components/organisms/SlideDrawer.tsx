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
          'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={clsx(
          'fixed top-0 right-0 z-50 h-full w-full sm:max-w-[560px] bg-[var(--color-bg-app)] shadow-[var(--shadow-heavy)]',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between px-inset-lg pt-stack-lg pb-stack-sm border-b border-[var(--color-border-subtle)]">
          <span className="font-display font-semibold text-sm text-[var(--color-text-tertiary)] tracking-[0.06em] uppercase">
            Detail
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="h-[calc(100%-56px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
