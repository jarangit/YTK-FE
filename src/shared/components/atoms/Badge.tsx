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
          'inline-flex cursor-pointer items-center gap-inline-xs rounded-full px-inline-sm py-stack-xs text-[length:var(--badge-font-size)] font-[600] tracking-[var(--badge-letter-spacing)] transition-all active:scale-[0.97]',
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
        'inline-flex items-center rounded-full px-inline-sm py-stack-xs text-[length:var(--badge-font-size)] font-[600] tracking-[var(--badge-letter-spacing)]',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
