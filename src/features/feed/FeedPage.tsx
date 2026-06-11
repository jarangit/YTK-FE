import { feedMock } from './data/feed.mock';
import FeedCard from './FeedCard';
import Text from '../../shared/components/atoms/Text';
import { useTranslation } from 'react-i18next';

export default function FeedPage() {
  const { t } = useTranslation();

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

        <div className="grid grid-cols-1 gap-inline-xl sm:grid-cols-2 xl:grid-cols-3">
          {feedMock.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
