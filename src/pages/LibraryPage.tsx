import LibraryCard from '../components/LibraryCard';
import EmptyState from '../components/EmptyState';
import { useLibrary } from '../hooks/useLibrary';

export default function LibraryPage() {
  const { items, hydrated, remove } = useLibrary();

  return (
    <main className="min-h-[calc(100vh-56px)] px-5 py-6 sm:py-10">
      <div className="mx-auto max-w-[720px]">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-1">
          Your kept videos
        </h1>
        <p className="text-sm text-ink-muted mb-6 sm:mb-8">
          Saved for later, ready when you are.
        </p>

        {!hydrated ? null : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <LibraryCard
                key={item.video.id + item.keptAt}
                item={item}
                onRemove={remove}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
