import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  as?: 'span' | 'button';
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  default:
    'bg-[var(--color-gray-100)] text-[var(--color-text-secondary)]',
  accent:
    'bg-[var(--color-accent-light)] text-[var(--color-accent)]',
};

export default function Badge({ children, variant = 'default', as: Tag = 'span', onClick, className }: BadgeProps) {
  if (Tag === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'inline-flex items-center gap-inline-xs px-inline-sm py-stack-xs rounded-full text-[11px] font-[600] tracking-[0.02em] cursor-pointer transition-all active:scale-[0.97]',
          variantStyles[variant],
          onClick && 'hover:opacity-80',
          className,
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-inline-sm py-stack-xs rounded-full text-[11px] font-[600] tracking-[0.02em]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
