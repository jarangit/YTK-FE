import { useTranslation } from 'react-i18next';
import Card from '../../shared/components/atoms/Card';

const skeletonLine = 'rounded-full bg-border/70';

export default function ResultContentSkeleton() {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-label={t('result.loadingAnalysis')}
      className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg"
    >
      <span className="sr-only">{t('result.loadingAnalysis')}</span>
      <div aria-hidden="true" className="space-y-stack-md animate-pulse motion-reduce:animate-none sm:space-y-stack-lg">
        <OutcomeSkeleton />
        <SummarySkeleton />
        <TranscriptSkeleton />
      </div>
    </div>
  );
}

function OutcomeSkeleton() {
  return (
    <Card padded className="bg-[var(--color-bg-card)]">
      <div className={`${skeletonLine} h-6 w-52`} />
      <div className={`${skeletonLine} mt-stack-sm h-4 w-72 max-w-full`} />
      <div className="mt-stack-md space-y-stack-sm">
        {[88, 72, 80, 64].map((width) => (
          <div key={width} className="flex items-center gap-inline-sm">
            <div className="h-4 w-4 shrink-0 rounded-full bg-border/70" />
            <div className={`${skeletonLine} h-4`} style={{ width: `${width}%` }} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function SummarySkeleton() {
  return (
    <Card className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className={`${skeletonLine} h-3 w-24`} />
        <div className="mt-stack-sm max-w-[46rem] space-y-stack-sm">
          <div className={`${skeletonLine} h-6 w-[92%]`} />
          <div className={`${skeletonLine} h-6 w-[76%]`} />
        </div>
        <div className="mt-stack-lg max-w-[46rem]">
          <div className={`${skeletonLine} h-4 w-40`} />
          <div className="mt-stack-sm space-y-stack-sm">
            {[84, 70, 78].map((width) => (
              <div key={width} className="flex items-center gap-inline-sm">
                <div className="h-5 w-5 shrink-0 rounded-full bg-border/70" />
                <div className={`${skeletonLine} h-4`} style={{ width: `${width}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-stack-lg flex items-center justify-between border-t border-border/50 pt-stack-md">
          <div className={`${skeletonLine} h-5 w-36`} />
          <div className={`${skeletonLine} h-4 w-28`} />
        </div>
      </div>
    </Card>
  );
}

function TranscriptSkeleton() {
  return (
    <Card className="bg-[var(--color-bg-card)]">
      <div className="flex items-center justify-between gap-inline-md p-inset-md sm:p-inset-lg">
        <div className="min-w-0 flex-1">
          <div className={`${skeletonLine} h-6 w-32`} />
          <div className={`${skeletonLine} mt-stack-xs h-4 w-80 max-w-full`} />
        </div>
        <div className="h-4 w-4 shrink-0 rounded bg-border/70" />
      </div>
    </Card>
  );
}
