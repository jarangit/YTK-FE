import clsx from 'clsx';

interface FormFieldProps {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({ id, label, error, helperText, children, className }: FormFieldProps) {
  const description = error || helperText;

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label htmlFor={id} className="mb-stack-xs block text-[length:var(--text-caption-size)] font-semibold text-ink">
          {label}
        </label>
      )}
      {children}
      {description && (
        <p
          id={`${id}-description`}
          className={clsx(
            'pl-1 pt-stack-xs text-left text-[length:var(--text-label-size)]',
            error ? 'text-red-500' : 'text-ink-faint',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
