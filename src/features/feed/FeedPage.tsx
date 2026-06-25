import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import FeedCard from './FeedCard';
import FeedDetailContent from './FeedDetailContent';
import Drawer from '../../shared/components/organisms/Drawer';
import Text from '../../shared/components/atoms/Text';
import SearchInput from '../../shared/components/molecules/SearchInput';
import StateBlock from '../../shared/components/molecules/StateBlock';
import { useTranslation } from 'react-i18next';
import { useFeedQuery } from './hooks/useFeedQuery';
import { useSaveFeedItemMutation } from './hooks/useSaveFeedItemMutation';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { clearSelectedFeedItem, selectFeedItem, setFeedQuery } from './state/feedSlice';
import ContentTransition from '../../shared/components/atoms/ContentTransition';

export default function FeedPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.feed.query);
  const selectedItemId = useAppSelector((state) => state.feed.selectedItemId);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useFeedQuery(debouncedQuery, undefined, 10);
  const saveFeedItem = useSaveFeedItemMutation();
  const filteredItems = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );
  const selectedItem = useMemo(
    () => filteredItems.find((item) => item.id === selectedItemId) ?? null,
    [filteredItems, selectedItemId],
  );

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
    }, { rootMargin: '240px 0px' });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleCardClick = useCallback((id: string) => {
    dispatch(selectFeedItem(id));
  }, [dispatch]);

  const closeDrawer = useCallback(() => {
    dispatch(clearSelectedFeedItem());
  }, [dispatch]);

  const handleSearchChange = useCallback((value: string) => {
    dispatch(setFeedQuery(value));
  }, [dispatch]);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg-app)]">
      <section className="mx-auto w-full max-w-[1120px] px-inset-lg pt-stack-xl pb-stack-2xl">
        <div className="mb-stack-xl max-w-[760px]">
          <Text as="p" variant="label" color="secondary" className="mb-stack-sm normal-case tracking-[0.08em]">
            {t('feed.eyebrow')}
          </Text>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] text-ink mb-stack-sm">
            {t('feed.title')}
          </h1>
          <Text as="p" variant="body" color="secondary" className="max-w-[640px] text-[17px] leading-[23px]">
            {t('feed.subtitle')}
          </Text>
        </div>

        <div className="mb-stack-lg w-full">
          <SearchInput
            placeholder={t('search.placeholder')}
            value={query}
            onChange={handleSearchChange}
          />
        </div>

        <ContentTransition transitionKey={`${debouncedQuery.toLowerCase()}:${filteredItems.map((item) => item.id).join(',')}`}>
          <div className="grid grid-cols-1 gap-inline-xl">
            {filteredItems.map((item) => (
              <FeedCard
                key={item.id}
                item={item}
                onClick={handleCardClick}
                onSave={saveFeedItem.save}
                saving={saveFeedItem.isPending && saveFeedItem.variables === item.id}
              />
            ))}

            {isLoading && (
              <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-inset-lg py-stack-lg text-sm text-[var(--color-text-secondary)]">
                Loading feed...
              </div>
            )}

            {!isLoading && filteredItems.length === 0 && (
              <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] px-inset-lg py-stack-lg text-sm text-[var(--color-text-secondary)]">
                No matching feed items.
              </div>
            )}

            {!isLoading && filteredItems.length > 0 && (
              <div ref={sentinelRef} className="flex justify-center py-stack-md">
                {isFetchingNextPage && (
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    Loading more...
                  </div>
                )}
                {!hasNextPage && (
                  <div className="text-sm text-[var(--color-text-tertiary)]">
                    คุณอ่านครบแล้ววันนี้
                  </div>
                )}
              </div>
            )}
          </div>
        </ContentTransition>
      </section>

      <Drawer open={!!selectedItem} onClose={closeDrawer} title="Detail">
        {selectedItem && (
          <ContentTransition transitionKey={selectedItem.id}>
            <FeedDetailContent
              item={selectedItem}
              onSaveFeedItem={() => saveFeedItem.save(selectedItem.id)}
              saving={saveFeedItem.isPending && saveFeedItem.variables === selectedItem.id}
            />
          </ContentTransition>
        )}
      </Drawer>
    </main>
  );
}
