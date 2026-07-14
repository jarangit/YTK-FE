import clsx from 'clsx';

interface ReasonOption<T extends string> {
  value: T;
  label: string;
}

interface ReasonChipsProps<T extends string> {
  id: string;
  options: ReasonOption<T>[];
  value: T[];
  onToggle: (value: T) => void;
  disabled?: boolean;
}

export default function ReasonChips<T extends string>({
  id,
  options,
  value,
  onToggle,
  disabled,
}: ReasonChipsProps<T>) {
  return (
    <div id={id} className="flex flex-wrap gap-inline-sm">
      {options.map((option) => {
        const selected = value.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            disabled={disabled}
            onClick={() => onToggle(option.value)}
            className={clsx(
              'rounded-full border px-inset-md py-stack-xs text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
              selected
                ? 'border-accent bg-accent-light text-accent'
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
