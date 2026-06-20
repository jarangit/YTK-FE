import { CircleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VideoAnalysis } from '../analysis/types';
import { Button } from '../../shared/components/atoms/Button';
import StateBlock from '../../shared/components/molecules/StateBlock';
import ExampleAnalysisCard from './ExampleAnalysisCard';

interface ExampleAnalysisStateProps {
  video?: VideoAnalysis;
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
}

function ExampleAnalysisSkeleton() {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-label={t('home.exampleLoading')}
      className="overflow-hidden rounded-[32px] border border-border/60 bg-[var(--color-bg-card)] shadow-[0_20px_80px_rgba(15,23,42,0.06)]"
    >
      <span className="sr-only">{t('home.exampleLoading')}</span>
      <div className="grid animate-pulse gap-0 motion-reduce:animate-none lg:grid-cols-[var(--example-analysis-media-width)_minmax(0,1fr)]">
        <div className="bg-surface p-4 sm:p-5 lg:p-6">
          <div className="aspect-[4/5] rounded-[24px] bg-border/60 lg:aspect-[3/4]" />
        </div>

        <div className="min-w-0 px-6 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-8">
          <div className="border-b border-border/70 pb-6">
            <div className="h-3 w-28 rounded-full bg-border/70" />
            <div className="mt-4 h-8 w-4/5 rounded-lg bg-border/70" />
            <div className="mt-3 h-5 w-2/5 rounded-md bg-border/60" />
          </div>

          <div className="grid gap-6 pt-6 xl:grid-cols-[minmax(0,1fr)_var(--example-analysis-summary-width)] xl:gap-8">
            <div>
              <div className="h-7 w-3/5 rounded-lg bg-border/70" />
              <div className="mt-5 space-y-4">
                <div className="h-5 w-full rounded-md bg-border/60" />
                <div className="h-5 w-11/12 rounded-md bg-border/60" />
                <div className="h-5 w-4/5 rounded-md bg-border/60" />
              </div>
            </div>

            <div className="rounded-[24px] bg-surface p-5 sm:p-6">
              <div className="h-3 w-24 rounded-full bg-border/70" />
              <div className="mt-4 h-6 w-4/5 rounded-md bg-border/70" />
              <div className="mt-4 h-4 w-full rounded-md bg-border/60" />
              <div className="mt-3 h-4 w-5/6 rounded-md bg-border/60" />
              <div className="mt-6 h-5 w-32 rounded-md bg-border/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExampleAnalysisState({
  video,
  isPending,
  isError,
  onRetry,
}: ExampleAnalysisStateProps) {
  const { t } = useTranslation();

  if (isPending) {
    return <ExampleAnalysisSkeleton />;
  }

  if (isError || !video) {
    return (
      <div role="alert" className="rounded-[32px] border border-border/60 bg-[var(--color-bg-card)]">
        <StateBlock
          icon={CircleAlert}
          title={t('home.exampleErrorTitle')}
          description={t('home.exampleErrorDescription')}
          action={<Button onClick={onRetry}>{t('home.exampleRetry')}</Button>}
        />
      </div>
    );
  }

  return <ExampleAnalysisCard video={video} />;
}
