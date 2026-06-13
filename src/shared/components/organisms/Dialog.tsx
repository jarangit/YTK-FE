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
        'fixed inset-0 z-50 flex items-center justify-center px-inset-md transition-opacity duration-200',
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="absolute inset-0 bg-[var(--modal-overlay-background)] backdrop-blur-sm"
      />
      <section className="relative w-full max-w-[var(--modal-max-width)] rounded-[var(--modal-radius)] border border-border/60 bg-white p-[var(--modal-padding)] shadow-[var(--modal-shadow)] sm:p-[var(--modal-padding-wide)]">
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
