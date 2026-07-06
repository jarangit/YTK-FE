import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  subtitle: string;
  detail?: string;
  accentColor?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  subtitle,
  detail,
  accentColor,
}: StatCardProps) {
  return (
    <div
      className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg shadow-[var(--card-shadow)]"
    >
      <div className="mb-3 flex items-center gap-inline-sm">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: accentColor ?? 'var(--color-accent-light)' }}
        >
          {icon}
        </span>
        <span className="text-sm font-semibold text-ink-muted">{label}</span>
      </div>

      <p className="font-display text-[28px] font-semibold tracking-[-0.02em] text-ink">
        {value}
      </p>

      <p className="mt-1 text-sm text-ink-faint">{subtitle}</p>

      {detail && (
        <p className="mt-2 border-t border-[var(--color-border-subtle)] pt-2 text-xs text-ink-faint">
          {detail}
        </p>
      )}
    </div>
  );
}
