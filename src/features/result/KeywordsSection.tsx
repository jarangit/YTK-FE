import { Hash, UserRound, Shapes } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { OriginalContext } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface KeywordsSectionProps {
  context?: OriginalContext | null;
}

function ContextGroup({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: typeof Hash;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="flex items-center gap-inline-xs text-sm font-semibold text-ink">
        <Icon className="h-4 w-4 text-accent" />
        {title}
      </h3>
      <div className="mt-stack-sm flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={`${title}-${item}`}
            className="rounded-full border border-border/60 bg-surface px-3 py-1 text-sm text-ink-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function KeywordsSection({ context }: KeywordsSectionProps) {
  const { t } = useTranslation();
  const keywords = context?.keywords ?? [];
  const people = context?.people ?? [];
  const topics = context?.topics ?? [];

  if (keywords.length === 0 && people.length === 0 && topics.length === 0) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-start gap-inline-sm">
          <div className="rounded-full bg-accent/10 p-2 text-accent">
            <Hash className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">{t('resultKeywords.title')}</h2>
            <p className="mt-stack-xs text-sm text-ink-muted">{t('resultKeywords.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg grid gap-stack-md sm:grid-cols-3">
          <ContextGroup title={t('resultKeywords.keywords')} items={keywords} icon={Hash} />
          <ContextGroup title={t('resultKeywords.people')} items={people} icon={UserRound} />
          <ContextGroup title={t('resultKeywords.topics')} items={topics} icon={Shapes} />
        </div>
      </div>
    </Card>
  );
}
