import { useMemo, useState, useCallback } from 'react';
import { feedMock } from './data/feed.mock';
import FeedCard from './FeedCard';
import FeedDetailContent from './FeedDetailContent';
import SlideDrawer from '../../shared/components/organisms/SlideDrawer';
import Text from '../../shared/components/atoms/Text';
import SearchInput from '../../shared/components/molecules/SearchInput';
import { useTranslation } from 'react-i18next';
import { useLibrary } from '../../shared/hooks/useLibrary';

export default function FeedPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { add, remove } = useLibrary();

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return feedMock;
    }

    return feedMock.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.channelName.toLowerCase().includes(normalizedQuery) ||
      item.topic.toLowerCase().includes(normalizedQuery) ||
      item.excerpt.toLowerCase().includes(normalizedQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)),
    );
  }, [query]);

  const selectedItem = useMemo(
    () => filteredItems.find((item) => item.id === selectedItemId) ?? null,
    [filteredItems, selectedItemId],
  );

  const handleCardClick = useCallback((id: string) => {
    setSelectedItemId(id);
  }, []);

  const closeDrawer = useCallback(() => {
    setSelectedItemId(null);
  }, []);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[var(--color-bg-app)]">
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

        <div className="mb-stack-lg max-w-[420px]">
          <SearchInput
            placeholder={t('search.placeholder')}
            value={query}
            onChange={setQuery}
          />
        </div>

        <div className="grid grid-cols-1 gap-inline-xl sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <FeedCard key={item.id} item={item} onClick={handleCardClick} />
          ))}
        </div>
      </section>

      <SlideDrawer isOpen={!!selectedItem} onClose={closeDrawer}>
        {selectedItem && (
          <FeedDetailContent
            item={selectedItem}
            onKeep={add}
            onRemove={remove}
            initiallyKept={false}
          />
        )}
      </SlideDrawer>
    </main>
  );
}
