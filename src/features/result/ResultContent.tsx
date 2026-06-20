import type { VideoAnalysis } from '../analysis/types';
import KeepAction from '../analysis/KeepAction';
import OutcomeCard from '../analysis/OutcomeCard';
import SummaryAccordion from '../analysis/SummaryAccordion';
import VideoPreviewCard from '../analysis/VideoPreviewCard';
import TranscriptSection from './TranscriptSection';

interface ResultContentProps {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (videoId: string) => void;
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
      <OutcomeCard outcomes={video.outcomes} />
      <SummaryAccordion summary={video.summary} />
      <TranscriptSection transcript={video.transcript} />
    </div>
  );
}
