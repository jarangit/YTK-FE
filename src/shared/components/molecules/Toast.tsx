import clsx from 'clsx';

interface ToastProps {
  children: React.ReactNode;
  visible: boolean;
}

export default function Toast({ children, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div
      className={clsx(
        'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-btn bg-ink px-inset-md py-stack-sm text-sm font-medium text-white shadow-lg',
        'animate-[fadeInUp_0.3s_ease-out]',
      )}
    >
      {children}
    </div>
  );
}
