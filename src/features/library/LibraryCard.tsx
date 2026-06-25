import { useState, useRef, useEffect } from 'react';
import { Bookmark, FileText, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import IconButton from '../../shared/components/atoms/IconButton';
import type { KeptItem } from './types';
import VideoCollectionCard from './VideoCollectionCard';

interface LibraryCardProps {
  item: KeptItem;
  onRemove: (libraryItemId: string) => void;
}

export default function LibraryCard({ item, onRemove }: LibraryCardProps) {
  const { t } = useTranslation();
  const { video } = item;
  const [isRemoving, setIsRemoving] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleRemove = () => {
    setIsRemoving(true);
    timeoutRef.current = window.setTimeout(() => {
      onRemove(item.id);
      timeoutRef.current = null;
    }, 160);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div
      aria-hidden={isRemoving}
      className={isRemoving ? 'pointer-events-none scale-[0.98] opacity-0' : 'scale-100 opacity-100'}
    >
      <VideoCollectionCard
        video={video}
        date={item.createdAt}
        badge={[item.language?.toUpperCase(), t('library.savedBadge')].filter(Boolean).join(' • ')}
        destination={`/result?analysisId=${encodeURIComponent(item.analysisId)}`}
        metadata={[
          { icon: FileText, label: video.outcomes?.length ?? 0 },
          { icon: Bookmark, label: t('keep.kept') },
        ]}
        footerAction={(
          <IconButton
            icon={Trash2}
            ariaLabel={t('card.remove')}
            variant="ghost"
            size="sm"
            onClick={handleRemove}
          />
        )}
      />
    </div>
  );
}
