import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Text from '../../shared/components/atoms/Text';
import ShowCard from './ShowCard';
import PodcastEpisodeCard from './PodcastEpisodeCard';
import MiniPlayer from './MiniPlayer';
import HorizontalRail from './components/HorizontalRail';
import { shows, upNextEpisodes } from './podcasts.mock';
import PageLayout from '../../shared/components/organisms/PageLayout';
import PageHeader from '../../shared/components/organisms/PageHeader';

export default function PodcastPage() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEpisode, setActiveEpisode] = useState<string | null>(null);

  const handlePlay = useCallback((id: string) => {
    setActiveEpisode((prev) => (prev === id ? prev : id));
    setIsPlaying((prev) => (activeEpisode === id ? !prev : true));
  }, [activeEpisode]);

  return (
    <PageLayout className="min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-[1120px] px-inset-lg pt-stack-xl pb-stack-2xl">
        <PageHeader
          eyebrow={t('podcast.eyebrow')}
          title={t('podcast.title')}
          subtitle={t('podcast.subtitle')}
          className="mb-stack-xl"
        />

        <div className="space-y-stack-xl">
          <HorizontalRail title={t('podcast.showsTitle')}>
            {shows.map((show) => (
              <ShowCard
                key={show.id}
                title={show.title}
                category={show.category}
                meta={show.meta}
                imageUrl={show.imageUrl}
              />
            ))}
          </HorizontalRail>

          <div>
            <Text variant="title" as="h2" className="mb-stack-md">
              {t('podcast.episodesTitle')}
            </Text>
            <div className="grid grid-cols-1 gap-inline-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {upNextEpisodes.map((episode) => (
                <PodcastEpisodeCard
                  key={episode.id}
                  title={episode.title}
                  description={episode.description}
                  channelName={episode.channelName}
                  date={episode.date}
                  duration={episode.duration}
                  imageUrl={episode.imageUrl}
                  backgroundColor={episode.backgroundColor}
                  textColor={episode.textColor}
                  isPlaying={isPlaying && activeEpisode === episode.id}
                  onPlay={() => handlePlay(episode.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeEpisode && (
        <MiniPlayer
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying((prev) => !prev)}
        />
      )}
    </PageLayout>
  );
}
