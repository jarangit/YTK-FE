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
        'h-9 rounded-[var(--radius-sm)] bg-[var(--color-gray-100)]',
        'transition-colors duration-200 focus-within:bg-white focus-within:ring-1 focus-within:ring-[var(--color-border-subtle)]',
        className,
      )}
    >
      <Search
        size={15}
        className="absolute left-3 text-[var(--color-text-tertiary)] pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full h-full pl-8 pr-inline-md bg-transparent border-none',
          'text-[13px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)]',
          'focus:outline-none',
        )}
      />
    </div>
  );
}
