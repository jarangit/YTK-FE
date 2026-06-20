import clsx from 'clsx';

interface ToastProps {
  children: React.ReactNode;
  visible: boolean;
}

export default function Toast({ children, visible }: ToastProps) {
  return (
    <div
      className={clsx(
        'toast-presence fixed bottom-6 left-1/2 z-50 rounded-btn border border-border bg-[var(--color-bg-elevated)] px-inset-md py-stack-sm text-sm font-medium text-ink shadow-lg',
        !visible && 'pointer-events-none',
      )}
      data-visible={visible}
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}
