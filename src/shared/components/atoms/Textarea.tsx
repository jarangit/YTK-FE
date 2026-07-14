import clsx from 'clsx';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export default function Textarea({ invalid, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={clsx(
        'w-full rounded-[var(--input-radius)] border bg-surface px-[var(--input-padding-x)] py-stack-sm text-[length:var(--input-font-size)] text-ink outline-none transition-shadow placeholder:text-ink-faint',
        invalid
          ? 'border-danger focus:border-danger focus:shadow-[var(--input-error-ring)]'
          : 'border-transparent focus:border-accent focus:bg-[var(--color-bg-card)] focus:shadow-[var(--input-focus-ring)]',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}
