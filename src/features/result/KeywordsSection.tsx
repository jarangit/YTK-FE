import { Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../../shared/components/atoms/Card';

interface KeywordsSectionProps {
  keywords: string[];
}

export default function KeywordsSection({ keywords }: KeywordsSectionProps) {
  const { t } = useTranslation();

  if (keywords.length === 0) return null;

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

        <div className="mt-stack-lg flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-border/60 bg-surface px-3 py-1 text-sm text-ink-muted"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
