import { ArrowLeft, ExternalLink, Heart, Bookmark, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getFeedItemById } from './data/feed.mock';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';

export default function FeedDetailPage() {
  const { id = '' } = useParams();
  const { t } = useTranslation();
  const item = getFeedItemById(id);

  if (!item) {
    return (
      <main className="min-h-[calc(100vh-56px)] bg-[var(--color-bg-app)]">
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
    <main className="min-h-[calc(100vh-56px)] bg-[var(--color-bg-app)]">
      <section className="mx-auto w-full max-w-read px-inset-lg pt-stack-xl pb-stack-2xl">
        <Link
          to="/feed"
          className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent no-underline transition-colors hover:text-accent-hover mb-stack-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('feed.backToFeed')}
        </Link>

        <div className="overflow-hidden rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] shadow-card">
          <div className="aspect-video relative overflow-hidden bg-surface">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
              {item.duration}
            </span>
          </div>

          <div className="p-inset-md sm:p-inset-lg">
            <div className="mb-stack-sm flex flex-wrap items-center gap-inline-sm">
              <Badge variant="accent">{item.topic}</Badge>
              <Text variant="caption" color="tertiary">
                {item.publishedAt}
              </Text>
            </div>

            <Text variant="display" as="h1" className="mb-stack-sm leading-snug">
              {item.title}
            </Text>

            <Text variant="body" color="secondary" className="mb-stack-lg text-[17px] leading-[23px]">
              {item.excerpt}
            </Text>

            <div className="mb-stack-lg flex flex-wrap items-center gap-inline-md text-[12px] text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-inline-xs">
                <FileText className="w-3.5 h-3.5" />
                {t('feed.summaryCount', { count: item.summaryCount })}
              </span>
              <span className="flex items-center gap-inline-xs">
                <Heart className="w-3.5 h-3.5" />
                {item.likes}
              </span>
              <span className="flex items-center gap-inline-xs">
                <Bookmark className="w-3.5 h-3.5" />
                {item.savedCount}
              </span>
            </div>

            <div className="mb-stack-lg flex flex-wrap gap-inline-xs">
              {item.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <div className="rounded-card bg-surface p-inset-md mb-stack-lg">
              <Text variant="title" as="h2" className="mb-stack-xs">
                {t('feed.communitySummary')}
              </Text>
              <Text variant="body" color="secondary">
                {item.excerpt} {t('feed.detailNote')}
              </Text>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-inline-md border-t border-[var(--color-border-subtle)] pt-stack-sm">
              <Text variant="caption" color="tertiary">
                {item.channelName}
              </Text>
              <div className="flex flex-wrap items-center gap-inline-md">
                <a
                  href={item.channelUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-inline-xs text-xs font-medium text-[var(--color-text-secondary)] no-underline transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {t('feed.openChannel')}
                </a>
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-inline-xs text-xs font-medium text-accent no-underline transition-colors hover:text-accent-hover"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t('feed.openVideo')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
