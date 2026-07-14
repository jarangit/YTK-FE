import clsx from 'clsx';

interface RatingOption<T extends string> {
  value: T;
  label: string;
}

interface RatingPillsProps<T extends string> {
  id: string;
  options: RatingOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  disabled?: boolean;
}

export default function RatingPills<T extends string>({
  id,
  options,
  value,
  onChange,
  disabled,
}: RatingPillsProps<T>) {
  return (
    <div id={id} role="radiogroup" className="flex flex-wrap gap-inline-sm">
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={clsx(
              'rounded-full border px-inset-md py-stack-xs text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
              selected
                ? 'border-accent bg-accent text-[var(--color-accent-contrast)]'
                : 'border-border bg-[var(--color-bg-card)] text-ink hover:border-ink-faint hover:bg-surface',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
