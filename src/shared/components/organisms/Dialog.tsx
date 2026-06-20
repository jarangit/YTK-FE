import { X } from 'lucide-react';
import clsx from 'clsx';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  children: React.ReactNode;
}

export default function Dialog({ open, onClose, closeLabel, children }: DialogProps) {
  return (
    <div
      className={clsx(
        'reduce-motion-transitions fixed inset-0 z-50 flex items-center justify-center px-inset-md transition-opacity',
        'duration-[var(--motion-duration-overlay)] ease-[var(--motion-easing-standard)]',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-[var(--modal-overlay-background)] backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        className={clsx(
          'reduce-motion-transitions relative w-full max-w-[var(--modal-max-width)] rounded-[var(--modal-radius)] border border-border/60 bg-[var(--color-bg-card)] p-[var(--modal-padding)] shadow-[var(--modal-shadow)] sm:p-[var(--modal-padding-wide)]',
          'transition-[opacity,transform] duration-[var(--motion-duration-overlay)] ease-[var(--motion-easing-standard)]',
          open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.98] opacity-0',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-[var(--modal-padding)] top-[var(--modal-padding)] inline-flex h-[var(--app-header-control-height)] w-[var(--app-header-control-height)] items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-[var(--color-bg-hover)] hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </section>
    </div>
  );
}
