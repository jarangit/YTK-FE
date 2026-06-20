import { Search } from 'lucide-react';
import clsx from 'clsx';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function SearchInput({
  placeholder = 'Search',
  value,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div
      className={clsx(
        'relative flex items-center',
        'h-[var(--search-input-height)] rounded-[var(--radius-sm)] bg-[var(--color-gray-100)]',
        'transition-colors duration-200 focus-within:bg-[var(--color-bg-card)] focus-within:ring-1 focus-within:ring-[var(--color-border-subtle)]',
        className,
      )}
    >
      <Search
        size="var(--search-input-icon-size)"
        className="pointer-events-none absolute left-[var(--search-input-icon-left)] text-[var(--color-text-tertiary)]"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'h-full w-full border-none bg-transparent pl-[var(--search-input-padding-left)] pr-inline-md',
          'text-[length:var(--search-input-font-size)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
          'focus:outline-none',
        )}
      />
    </div>
  );
}
