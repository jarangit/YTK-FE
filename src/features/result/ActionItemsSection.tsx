import { Check, ListChecks } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ActionItemsSectionProps {
  items: string[];
}

export default function ActionItemsSection({ items }: ActionItemsSectionProps) {
  const { t } = useTranslation();

  if (items.length === 0) return null;

  return (
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="flex items-start gap-inline-sm">
          <ListChecks className="mt-1 h-4 w-4 text-accent" />
          <div>
            <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem]">{t('resultTakeaways.title')}</h2>
            <p className="mt-stack-xs max-w-[34rem] text-[15px] leading-7 text-ink-muted">{t('resultTakeaways.subtitle')}</p>
          </div>
        </div>

        <ul className="mt-stack-lg space-y-stack-md">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-inline-sm border-l border-accent/20 pl-5 sm:pl-6 text-[15px] leading-7 text-ink"
            >
              <span className="mt-1 rounded-full text-accent">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
