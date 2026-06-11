import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface IconButtonProps {
  icon: LucideIcon;
  ariaLabel: string;
  variant?: 'ghost' | 'filled';
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

const sizeStyles = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
};

const variantStyles = {
  ghost:
    'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]',
  filled:
    'bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-hover)] shadow-[var(--shadow-soft)]',
};

export default function IconButton({
  icon: Icon,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center rounded-full transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      <Icon size={size === 'sm' ? 16 : 20} />
    </button>
  );
}
