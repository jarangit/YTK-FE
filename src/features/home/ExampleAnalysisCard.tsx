import { ArrowRight, Clock, Eye, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Card from '../../shared/components/atoms/Card';
import Badge from '../../shared/components/atoms/Badge';
import type { HomeFeaturedAnalysis } from './types';

interface ExampleAnalysisCardProps {
  item: HomeFeaturedAnalysis;
}

function formatViewCount(value: number) {
  return new Intl.NumberFormat().format(value);
}

export default function ExampleAnalysisCard({ item }: ExampleAnalysisCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card className="shadow-card-hover">
      <div className="grid gap-0 lg:grid-cols-[var(--example-analysis-media-width)_minmax(0,1fr)]">
        <div className="relative bg-surface p-inset-md sm:p-inset-lg">
          <div className="overflow-hidden rounded-card bg-[var(--color-bg-card)]">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              loading="lazy"
            />
          </div>
        </div>

        <div className="min-w-0 p-inset-md sm:p-inset-lg">
          <div className="flex flex-wrap items-start justify-between gap-inline-md border-b border-border/70 pb-stack-lg">
            <div className="max-w-[560px]">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.exampleLabel')}
              </p>
              <h3 className="mt-stack-sm font-display text-[24px] font-semibold leading-[1.15] text-ink sm:text-[28px]">
                {item.title}
              </h3>
              <p className="mt-stack-xs text-sm leading-6 text-ink-muted">{item.channelName}</p>
            </div>

            <div className="flex flex-wrap items-center gap-inline-sm">
              <Badge variant="accent" className="gap-inline-xs">
                <TrendingUp className="h-3.5 w-3.5" />
                #{item.rank}
              </Badge>
              <Badge className="gap-inline-xs">
                <Eye className="h-3.5 w-3.5" />
                {formatViewCount(item.viewCount)}
              </Badge>
              {item.duration && (
                <div className="inline-flex items-center gap-inline-xs rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted">
                  <Clock className="h-4 w-4" />
                  {item.duration}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-stack-lg pt-stack-lg xl:grid-cols-[minmax(0,1fr)_var(--example-analysis-summary-width)] xl:gap-inline-xl">
            <div>
              <h4 className="text-[19px] font-semibold leading-[1.35] text-ink sm:text-[22px]">
                {t('home.summaryCta')}
              </h4>
              <p className="mt-stack-md text-[15px] leading-7 text-ink-muted">
                {item.summary}
              </p>
            </div>

            <div className="rounded-card bg-surface p-inset-md sm:p-inset-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {t('home.summaryLabel')}
              </p>
              <p className="mt-stack-sm text-base font-semibold leading-7 text-ink">
                {t('home.readPreview')}
              </p>
              <p className="mt-stack-sm text-sm leading-6 text-ink-muted">
                {t('home.featuredDetailHint')}
              </p>
              <div className="mt-stack-lg flex flex-wrap items-center gap-inline-sm text-xs text-ink-faint">
                <span>{t('home.featuredRank', { rank: item.rank })}</span>
                <span aria-hidden="true">•</span>
                <span>{t('home.featuredViews', { count: formatViewCount(item.viewCount) })}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/result?analysisId=${encodeURIComponent(item.analysisId)}`)}
                className="mt-stack-lg inline-flex items-center gap-inline-xs text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                {t('home.readPreview')}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
