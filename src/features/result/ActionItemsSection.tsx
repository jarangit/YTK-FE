import { Check, ListChecks } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../../shared/components/atoms/Card';

interface ActionItemsSectionProps {
  items: string[];
}

export default function ActionItemsSection({ items }: ActionItemsSectionProps) {
  const { t } = useTranslation();

  if (items.length === 0) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <ListChecks className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">{t('resultActions.title')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('resultActions.subtitle')}</p>
          </div>
        </div>

        <ul className="mt-stack-lg space-y-stack-sm">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-inline-sm rounded-card border border-border/50 bg-surface px-inset-md py-inset-sm text-sm leading-7 text-ink-muted"
            >
              <span className="mt-1 rounded-full bg-accent/10 p-1 text-accent">
                <Check className="h-3 w-3" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
