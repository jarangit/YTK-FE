import { Clock3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHistoryQuery } from './hooks/useHistoryQuery';
import { useLibraryQuery } from '../library/hooks/useLibraryQuery';
import VideoCollectionCard from '../library/VideoCollectionCard';
import CollectionSidebar from '../library/CollectionSidebar';
import CollectionGridSkeleton from '../library/CollectionGridSkeleton';
import AppShell from '../../app/layout/AppShell';
import Badge from '../../shared/components/atoms/Badge';
import ContentTransition from '../../shared/components/atoms/ContentTransition';
import Text from '../../shared/components/atoms/Text';
import StateBlock from '../../shared/components/molecules/StateBlock';

export default function HistoryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, hydrated } = useHistoryQuery();
  const { items: libraryItems, hydrated: libraryHydrated } = useLibraryQuery();

  return (
    <AppShell
      sidebar={(
        <CollectionSidebar
          activePath="/history"
          libraryCount={libraryHydrated ? libraryItems.length : undefined}
          historyCount={hydrated ? items.length : undefined}
          onNavigate={navigate}
        />
      )}
    >
      <header className="mb-stack-lg max-w-read">
        <div className="mb-stack-sm flex items-center gap-inline-md">
          <Text variant="display" as="h1">{t('history.title')}</Text>
          {hydrated && items.length > 0 && (
            <Badge variant="accent">{t('history.count', { count: items.length })}</Badge>
          )}
        </div>
        <Text variant="body" color="secondary">{t('history.subtitle')}</Text>
      </header>

      <ContentTransition transitionKey={!hydrated ? 'loading' : items.length === 0 ? 'empty' : 'content'}>
        {!hydrated ? (
          <CollectionGridSkeleton label={t('history.loading')} />
        ) : items.length === 0 ? (
          <StateBlock
            icon={Clock3}
            title={t('history.emptyTitle')}
            description={t('history.emptySubtitle')}
          />
        ) : (
          <div className="grid grid-cols-1 gap-inline-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => {
              const completed = item.status === 'COMPLETED';
              return (
                <VideoCollectionCard
                  key={item.id}
                  video={item.video}
                  date={item.createdAt}
                  badge={[item.language?.toUpperCase(), t(`history.status.${item.status.toLowerCase()}`)].filter(Boolean).join(' • ')}
                  badgeClassName={item.status === 'FAILED' ? 'bg-danger-soft text-danger-hover' : undefined}
                  destination={completed ? `/result?analysisId=${encodeURIComponent(item.analysisId)}` : undefined}
                  metadata={[{ icon: Clock3, label: t('history.analyzed') }]}
                />
              );
            })}
          </div>
        )}
      </ContentTransition>
    </AppShell>
  );
}
