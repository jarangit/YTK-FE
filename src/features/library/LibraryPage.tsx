import { useNavigate } from 'react-router-dom';
import { Home, Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import EmptyState from './EmptyState';
import LibraryCard from './LibraryCard';
import { useLibraryQuery } from './hooks/useLibraryQuery';
import AppShell from '../../app/layout/AppShell';
import AppSidebar from '../../app/layout/AppSidebar';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';
import ContentTransition from '../../shared/components/atoms/ContentTransition';

function LibrarySkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="grid animate-pulse grid-cols-1 gap-inline-lg motion-reduce:animate-none sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="overflow-hidden rounded-card border border-[var(--color-border-subtle)] bg-surface">
          <div className="aspect-video bg-border/60" />
          <div className="space-y-3 p-inset-lg">
            <div className="h-4 w-24 rounded bg-border/60" />
            <div className="h-6 w-4/5 rounded bg-border/70" />
            <div className="h-4 w-full rounded bg-border/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LibraryPage() {
  const { t } = useTranslation();
  const { items, hydrated, remove } = useLibraryQuery();
  const navigate = useNavigate();

  const sidebarSections = [
    {
      items: [
        { icon: Home, label: t('nav.home'), path: '/' },
      ],
    },
    {
      label: t('sidebar.library'),
      items: [
        { icon: Bookmark, label: t('nav.library'), path: '/library', count: hydrated ? items.length : undefined },
      ],
    },
  ];

  return (
    <AppShell
      sidebar={
        <AppSidebar
          sections={sidebarSections}
          activePath="/library"
          onNavigate={(path) => navigate(path)}
        />
      }
    >
      <div>
        <header className="mb-stack-lg max-w-read">
          <div className="mb-stack-sm flex items-center gap-inline-md">
            <Text variant="display" as="h1">
              {t('library.title')}
            </Text>
            {hydrated && items.length > 0 && (
              <Badge variant="accent">{t('library.count', { count: items.length })}</Badge>
            )}
          </div>
          <Text variant="body" color="secondary">
            {t('library.subtitle')}
          </Text>
        </header>

        <ContentTransition transitionKey={!hydrated ? 'loading' : items.length === 0 ? 'empty' : 'content'}>
          {!hydrated ? (
            <LibrarySkeleton label={t('library.loading')} />
          ) : items.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-inline-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => (
                <LibraryCard
                  key={item.video.id + item.keptAt}
                  item={item}
                  onRemove={remove}
                />
              ))}
            </div>
          )}
        </ContentTransition>
      </div>
    </AppShell>
  );
}
