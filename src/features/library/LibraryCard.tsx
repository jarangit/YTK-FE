import { Link } from 'react-router-dom';
import { ExternalLink, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { KeptItem } from '../../shared/types';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';
import IconButton from '../../shared/components/atoms/IconButton';

interface Props {
  item: KeptItem;
  onRemove: (videoId: string) => void;
}

export default function LibraryCard({ item, onRemove }: Props) {
  const { t } = useTranslation();
  const { video, keptAt } = item;
  const keptDate = new Date(keptAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="overflow-hidden rounded-[var(--library-card-radius)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-[var(--library-card-thumbnail-width)] shrink-0">
          <div className="aspect-video sm:aspect-[16/9] relative overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 p-inset-md sm:p-[var(--library-card-padding)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-inline-sm mb-[var(--library-card-meta-gap)]">
              <Badge>{keptDate}</Badge>
            </div>
            <Text variant="title" as="h3" className="line-clamp-2 mb-stack-sm">
              {video.title}
            </Text>
            <ul className="space-y-stack-xs mb-stack-md">
              {video.outcomes.slice(0, 2).map((o, i) => (
                <li key={i} className="flex items-start gap-inline-xs">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 mt-0.5 bg-[var(--color-accent)]"
                  />
                  <Text variant="caption" color="secondary" className="line-clamp-1">
                    {o}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between mt-stack-md pt-stack-sm border-t border-[var(--color-border-subtle)]">
            <Text variant="caption" color="tertiary">
              {video.channelName}
            </Text>
            <div className="flex items-center gap-inline-xs">
              <Link
                to={`/result?url=${encodeURIComponent(video.videoUrl)}`}
                className="no-underline"
              >
                <IconButton
                  icon={ExternalLink}
                  ariaLabel={t('card.openSummary')}
                  variant="filled"
                  size="sm"
                />
              </Link>
              <IconButton
                icon={Trash2}
                ariaLabel={t('card.remove')}
                variant="ghost"
                size="sm"
                onClick={() => onRemove(video.id)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
