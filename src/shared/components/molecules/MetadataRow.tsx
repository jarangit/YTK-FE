import { type LucideIcon } from 'lucide-react';

export interface MetadataItem {
  icon?: LucideIcon;
  label: React.ReactNode;
}

interface MetadataRowProps {
  items: MetadataItem[];
  className?: string;
}

export default function MetadataRow({ items, className }: MetadataRowProps) {
  return (
    <div className={className ?? 'flex flex-wrap items-center gap-inline-md text-[12px] text-[var(--color-text-secondary)]'}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <span key={index} className="flex items-center gap-inline-xs">
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {item.label}
          </span>
        );
      })}
    </div>
  );
}
