import { Hash, UserRound, Shapes } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { OriginalContext } from '../analysis/types';

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
    <div className="border-l border-accent/20 pl-5 sm:pl-6">
      <h3 className="flex items-center gap-inline-xs text-[1.02rem] font-semibold text-ink">
        <Icon className="h-4 w-4 text-accent" />
        {title}
      </h3>
      <div className="mt-stack-sm flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={`${title}-${item}`}
            className="rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-sm text-ink-muted"
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
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="flex items-start gap-inline-sm">
          <Hash className="mt-1 h-4 w-4 text-accent" />
          <div>
            <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem]">{t('resultKeywords.title')}</h2>
            <p className="mt-stack-xs max-w-[34rem] text-[15px] leading-7 text-ink-muted">{t('resultKeywords.subtitle')}</p>
          </div>
        </div>

        <div className="mt-stack-lg grid gap-stack-md sm:grid-cols-3">
          <ContextGroup title={t('resultKeywords.keywords')} items={keywords} icon={Hash} />
          <ContextGroup title={t('resultKeywords.people')} items={people} icon={UserRound} />
          <ContextGroup title={t('resultKeywords.topics')} items={topics} icon={Shapes} />
        </div>
      </div>
    </section>
  );
}
