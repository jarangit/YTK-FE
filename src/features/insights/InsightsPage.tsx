import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RefreshCw, Shuffle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/components/atoms/Button';
import ContentTransition from '../../shared/components/atoms/ContentTransition';
import SearchInput from '../../shared/components/molecules/SearchInput';
import StateBlock from '../../shared/components/molecules/StateBlock';
import Text from '../../shared/components/atoms/Text';
import InsightsQuestionCard from './InsightsQuestionCard';
import { useEngagementQuestionsQuery } from './hooks/useEngagementQuestionsQuery';

export default function InsightsPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useEngagementQuestionsQuery(debouncedQuery, 10);
  const items = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);
  const contentState = isLoading
    ? 'loading'
    : isError
      ? 'error'
      : items.length === 0
        ? 'empty'
        : 'content';

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query]);

  useEffect(() => {
    const node = sentinelRef.current;

    if (!node || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];

      if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    }, { rootMargin: '260px 0px' });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return (
    <main className="min-h-[calc(100vh-var(--app-header-height))] bg-[var(--color-bg-app)]">
      <section className="mx-auto w-full max-w-[var(--content-max-width)] px-inset-lg pt-stack-xl pb-stack-2xl">
        <div className="mb-stack-xl grid gap-stack-lg lg:grid-cols-[minmax(0,var(--content-read-width))_1fr] lg:items-end">
          <div>
            <Text as="p" variant="label" color="secondary" className="mb-stack-sm normal-case tracking-[0.08em]">
              {t('insights.eyebrow')}
            </Text>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
              {t('insights.title')}
            </h1>
            <Text as="p" variant="body" color="secondary" className="mt-stack-md max-w-read text-[length:var(--font-size-lg)] leading-7">
              {t('insights.subtitle')}
            </Text>
          </div>
          <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-md shadow-card">
            <div className="flex items-start gap-inline-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Shuffle className="h-4 w-4" />
              </div>
              <div>
                <Text as="p" variant="caption" className="font-bold">{t('insights.browseHintTitle')}</Text>
                <Text as="p" variant="caption" color="secondary" className="mt-stack-xs leading-6">{t('insights.browseHintSubtitle')}</Text>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-stack-lg w-full">
          <SearchInput
            placeholder={t('insights.searchPlaceholder')}
            value={query}
            onChange={handleSearchChange}
            className="bg-[var(--color-bg-card)]"
          />
        </div>

        <ContentTransition transitionKey={`${debouncedQuery.toLowerCase()}:${contentState}`}>
          <div className="grid grid-cols-1 gap-inline-xl">
            {items.map((item, index) => (
              <InsightsQuestionCard
                key={`${item.analysisId}:${item.video.id}:${index}`}
                item={item}
              />
            ))}

            {isLoading && (
              <CardState>
                <StateBlock title={t('insights.loading')} loading />
              </CardState>
            )}

            {!isLoading && isError && (
              <CardState>
                <StateBlock
                  title={t('insights.errorTitle')}
                  description={t('insights.errorSubtitle')}
                  action={(
                    <Button variant="secondary" size="sm" iconLeft={RefreshCw} onClick={() => void refetch()}>
                      {t('insights.retry')}
                    </Button>
                  )}
                />
              </CardState>
            )}

            {!isLoading && !isError && items.length === 0 && (
              <CardState>
                <StateBlock
                  icon={Sparkles}
                  title={t('insights.emptyTitle')}
                  description={debouncedQuery ? t('insights.emptySearchSubtitle') : t('insights.emptySubtitle')}
                />
              </CardState>
            )}

            {!isLoading && !isError && items.length > 0 && (
              <div ref={sentinelRef} className="flex justify-center py-stack-md">
                {isFetchingNextPage && (
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    {t('insights.loadingMore')}
                  </div>
                )}
                {!hasNextPage && (
                  <div className="flex flex-col items-center gap-stack-md">
                    <div className="text-sm text-[var(--color-text-tertiary)]">
                      {t('insights.endOfList')}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      iconLeft={RefreshCw}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        void refetch();
                      }}
                    >
                      {t('insights.refresh')}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </ContentTransition>
      </section>
    </main>
  );
}

function CardState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]">
      {children}
    </div>
  );
}
