import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';

interface CoreMessageSectionProps {
  coreMessage: string;
  children?: React.ReactNode;
}

export default function CoreMessageSection({ coreMessage, children }: CoreMessageSectionProps) {
  const { t } = useTranslation();
  const normalized = coreMessage.trim();

  if (!normalized) return null;

  return (
    <section className="border-t border-accent/20 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          {t('summary.startHere')}
        </div>
        <h2 className="mt-stack-sm max-w-[34rem] font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.3rem]">
          {t('summary.coreMessageTitle')}
        </h2>
        <div className="mt-stack-md rounded-card border border-accent/20 bg-accent/[0.04] px-inset-lg py-inset-lg shadow-card">
          <div className="whitespace-pre-line break-words font-display text-[1.2rem] leading-[1.5] tracking-[-0.01em] text-ink">
            <ReactMarkdown>{normalized}</ReactMarkdown>
          </div>
          {children && (
            <div className="mt-stack-lg border-t border-accent/15 pt-stack-lg">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
