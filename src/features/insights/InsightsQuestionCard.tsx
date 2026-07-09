import { ExternalLink, MessageCircleQuestion, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Avatar from '../../shared/components/atoms/Avatar';
import Badge from '../../shared/components/atoms/Badge';
import Card from '../../shared/components/atoms/Card';
import Text from '../../shared/components/atoms/Text';
import type { EngagementQuestionItem } from './types';

interface InsightsQuestionCardProps {
  item: EngagementQuestionItem;
}

export default function InsightsQuestionCard({ item }: InsightsQuestionCardProps) {
  const { t } = useTranslation();
  const videoTitle = item.video.title ?? t('insights.untitledVideo');
  const channelName = item.video.channelName ?? t('insights.unknownChannel');

  return (
    <Card className="bg-[var(--color-bg-card)]">
      <article className="p-inset-lg sm:p-inset-xl">
        <header className="mb-stack-md flex items-start justify-between gap-inline-md">
          <div className="flex min-w-0 items-start gap-inline-md">
            <Avatar src={item.video.channelLogo ?? undefined} alt={channelName} fallback={channelName} size="md" />
            <div className="min-w-0">
              <Text as="p" variant="body" className="truncate font-semibold">
                {channelName}
              </Text>
              <div className="mt-stack-xs flex min-w-0 items-center gap-inline-sm">
                <div className="relative flex h-8 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-bg-elevated)] text-ink-muted">
                  {item.video.thumbnail ? (
                    <img src={item.video.thumbnail} alt={videoTitle} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  )}
                </div>
                <Text as="p" variant="caption" color="tertiary" className="line-clamp-1">
                  {videoTitle}
                </Text>
              </div>
            </div>
          </div>
          <Badge variant="accent" className="shrink-0 uppercase">
            <MessageCircleQuestion className="mr-inline-xs h-3.5 w-3.5" />
            {t('insights.questionLabel')}
          </Badge>
        </header>

        <div className="space-y-stack-md">
          <Text as="h2" variant="display" className="max-w-read font-display text-ink sm:text-3xl">
            {item.question}
          </Text>

          <section className="rounded-[var(--radius-xl)] bg-[var(--color-bg-elevated)] px-inset-md py-stack-md sm:px-inset-lg">
            <Text as="p" variant="label" color="tertiary" className="mb-stack-sm tracking-[0.1em]">
              {t('insights.answer')}
            </Text>
            <Text as="p" variant="body" color="secondary" className="text-[length:var(--font-size-lg)] leading-8">
              {item.answer}
            </Text>
          </section>
        </div>

        <footer className="mt-stack-lg border-t border-[var(--color-border-subtle)] pt-stack-sm">
          <a
            href={item.video.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[var(--button-height-sm)] items-center justify-center gap-inline-sm rounded-[var(--button-radius)] px-[var(--button-padding-x-sm)] text-[length:var(--button-font-size-sm)] font-semibold text-ink-muted no-underline transition-colors hover:bg-[var(--color-bg-hover)] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            <Play className="h-4 w-4 fill-current" />
            {t('insights.openVideo')}
            <ExternalLink className="h-4 w-4" />
          </a>
        </footer>
      </article>
    </Card>
  );
}
