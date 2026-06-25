import type { VideoAnalysis } from '../analysis/types';
import KeepAction from '../analysis/KeepAction';
import OutcomeCard from '../analysis/OutcomeCard';
import VideoPreviewCard from '../analysis/VideoPreviewCard';
import ActionItemsSection from './ActionItemsSection';
import KeyInsightsSection from './KeyInsightsSection';
import KeywordsSection from './KeywordsSection';
import OverviewSection from './OverviewSection';
import TranscriptSection from './TranscriptSection';
import WorthItSection from './WorthItSection';

interface ResultContentProps {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (analysisId: string) => void;
  initiallyKept: boolean;
}

export default function ResultContent({
  video,
  onKeep,
  onRemove,
  initiallyKept,
}: ResultContentProps) {
  return (
    <div className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg">
      <VideoPreviewCard
        video={video}
        action={(
          <KeepAction
            video={video}
            onKeep={onKeep}
            onRemove={onRemove}
            initiallyKept={initiallyKept}
          />
        )}
      />
      <OverviewSection summary={video.summary} />
      <WorthItSection worthIt={video.summary.worthIt} />
      <OutcomeCard outcomes={video.outcomes} />
      <KeyInsightsSection insights={video.summary.keyInsights} />
      <ActionItemsSection items={video.summary.practicalTakeaways} />
      <KeywordsSection keywords={video.keywords} />
      <TranscriptSection transcript={video.transcript} />
    </div>
  );
}
