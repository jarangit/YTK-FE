import { Loader2, type LucideIcon } from 'lucide-react';
import { Link, type LinkProps } from 'react-router-dom';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

type ButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = ButtonBaseProps & LinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-[var(--color-accent-contrast)] hover:bg-accent-hover',
  secondary: 'border border-border bg-white text-ink hover:border-ink-faint hover:bg-surface',
  ghost: 'bg-surface text-ink hover:bg-[var(--color-bg-hover)]',
  destructive: 'bg-danger text-white hover:bg-danger-hover',
  link: 'h-auto rounded-none p-0 text-accent hover:text-accent-hover',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[var(--button-height-sm)] px-[var(--button-padding-x-sm)] text-[length:var(--button-font-size-sm)]',
  md: 'h-[var(--button-height-md)] px-[var(--button-padding-x-md)] text-[length:var(--button-font-size-md)]',
  lg: 'h-[var(--button-height-lg)] px-[var(--button-padding-x-lg)] text-[length:var(--button-font-size-lg)]',
};

function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  className,
}: Pick<ButtonBaseProps, 'variant' | 'size' | 'fullWidth' | 'loading' | 'className'>) {
  return clsx(
    'inline-flex items-center justify-center gap-inline-sm rounded-[var(--button-radius)] font-semibold no-underline transition-all active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60',
    variant !== 'link' && sizeStyles[size],
    variantStyles[variant],
    fullWidth && 'w-full',
    loading && 'pointer-events-none',
    className,
  );
}

function ButtonContent({
  loading,
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
}: ButtonBaseProps) {
  return (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : IconLeft ? <IconLeft className="h-4 w-4" /> : null}
      {children}
      {!loading && IconRight ? <IconRight className="h-4 w-4" /> : null}
    </>
  );
}

export function Button({
  variant,
  size,
  fullWidth,
  loading,
  iconLeft,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={buttonClassName({ variant, size, fullWidth, loading, className })}
      disabled={disabled || loading}
      {...props}
    >
      <ButtonContent loading={loading} iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </ButtonContent>
    </button>
  );
}

export function LinkButton({
  variant,
  size,
  fullWidth,
  loading,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={buttonClassName({ variant, size, fullWidth, loading, className })}
      {...props}
    >
      <ButtonContent loading={loading} iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </ButtonContent>
    </Link>
  );
}
