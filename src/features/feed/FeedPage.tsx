import { useCallback } from 'react';
import FeedCard from './FeedCard';
import FeedDetailContent from './FeedDetailContent';
import Drawer from '../../shared/components/organisms/Drawer';
import Text from '../../shared/components/atoms/Text';
import SearchInput from '../../shared/components/molecules/SearchInput';
import { useTranslation } from 'react-i18next';
import { useFeedQuery } from './hooks/useFeedQuery';
import { useSaveFeedItemMutation } from './hooks/useSaveFeedItemMutation';
import { useAppDispatch, useAppSelector } from '../../shared/store/hooks';
import { clearSelectedFeedItem, selectFeedItem, setFeedQuery } from './state/feedSlice';
import ContentTransition from '../../shared/components/atoms/ContentTransition';
import { toVideoAnalysis } from './FeedDetailContent';

export default function FeedPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.feed.query);
  const selectedItemId = useAppSelector((state) => state.feed.selectedItemId);
  const { data: filteredItems = [] } = useFeedQuery(query);
  const saveFeedItem = useSaveFeedItemMutation();

  const selectedItem = filteredItems.find((item) => item.id === selectedItemId) ?? null;

  const handleCardClick = useCallback((id: string) => {
    dispatch(selectFeedItem(id));
  }, [dispatch]);

  const closeDrawer = useCallback(() => {
    dispatch(clearSelectedFeedItem());
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
            onChange={(value) => dispatch(setFeedQuery(value))}
          />
        </div>

        <ContentTransition transitionKey={`${query.trim().toLowerCase()}:${filteredItems.map((item) => item.id).join(',')}`}>
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
          </div>
        </ContentTransition>
      </section>

      <Drawer open={!!selectedItem} onClose={closeDrawer} title="Detail">
        {selectedItem && (
          <ContentTransition transitionKey={selectedItem.id}>
            <FeedDetailContent
              video={toVideoAnalysis(selectedItem)}
              onSaveFeedItem={() => saveFeedItem.save(selectedItem.id)}
              saving={saveFeedItem.isPending && saveFeedItem.variables === selectedItem.id}
            />
          </ContentTransition>
        )}
      </Drawer>
    </main>
  );
}
