import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

const variantStyles = {
  default:
    'bg-[var(--color-gray-100)] text-[var(--color-text-secondary)]',
  accent:
    'bg-[var(--color-accent-light)] text-[var(--color-accent)]',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-[600] tracking-[0.02em]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
