import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import Text from '../../shared/components/atoms/Text';
import FeedDetailContent from './FeedDetailContent';
import { getVideoById } from '../result/api/videoAnalysisApi';
import { feedKeys } from './hooks/useFeedQuery';
import { useSaveFeedItemMutation } from './hooks/useSaveFeedItemMutation';

export default function FeedDetailPage() {
  const { id = '' } = useParams();
  const { t } = useTranslation();
  const { data: video, isLoading } = useQuery({
    queryKey: feedKeys.detail(id),
    queryFn: () => getVideoById(id),
    enabled: id.length > 0,
  });
  const saveFeedItem = useSaveFeedItemMutation();

  if (!isLoading && !video) {
    return (
      <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg-app)]">
        <section className="mx-auto w-full max-w-read px-inset-lg pt-stack-xl pb-stack-2xl">
          <Link
            to="/feed"
            className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent no-underline transition-colors hover:text-accent-hover mb-stack-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('feed.backToFeed')}
          </Link>

          <div className="rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-inset-lg">
            <Text variant="display" as="h1" className="mb-stack-sm">
              {t('feed.notFoundTitle')}
            </Text>
            <Text variant="body" color="secondary">
              {t('feed.notFoundSubtitle')}
            </Text>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[var(--color-bg-app)]">
      <section className="mx-auto w-full max-w-read px-inset-lg pt-stack-xl pb-stack-2xl">
        <Link
          to="/feed"
          className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent no-underline transition-colors hover:text-accent-hover mb-stack-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('feed.backToFeed')}
        </Link>

        {video && (
          <FeedDetailContent
            video={video}
            onSaveFeedItem={() => saveFeedItem.save(id)}
            saving={saveFeedItem.isPending && saveFeedItem.variables === id}
          />
        )}
      </section>
    </main>
  );
}
