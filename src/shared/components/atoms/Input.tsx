import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  invalid?: boolean;
  action?: React.ReactNode;
}

export default function Input({ icon: Icon, invalid, action, className, ...props }: InputProps) {
  return (
    <div className="relative flex-1 rounded-[var(--input-radius)] bg-surface">
      {Icon && (
        <Icon className="pointer-events-none absolute left-[var(--input-icon-left)] top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
      )}
      <input
        className={clsx(
          'h-[var(--input-height)] w-full rounded-[var(--input-radius)] border bg-surface text-[length:var(--input-font-size)] text-ink outline-none transition-shadow placeholder:text-ink-faint',
          Icon ? 'pl-[var(--input-padding-left-with-icon)]' : 'pl-[var(--input-padding-x)]',
          action ? 'pr-[var(--input-padding-right-with-action)]' : 'pr-[var(--input-padding-x)]',
          invalid
            ? 'border-danger focus:border-danger focus:shadow-[var(--input-error-ring)]'
            : 'border-transparent focus:border-accent focus:bg-[var(--color-bg-card)] focus:shadow-[var(--input-focus-ring)]',
          className,
        )}
        aria-invalid={invalid || undefined}
        {...props}
      />
      {action}
    </div>
  );
}
