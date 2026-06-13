import type { VideoAnalysis } from './types';
import VideoPreviewCard from './VideoPreviewCard';
import OutcomeCard from './OutcomeCard';
import SummaryAccordion from './SummaryAccordion';
import KeepButton from './KeepButton';

interface AnalysisContentProps {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (videoId: string) => void;
  initiallyKept: boolean;
}

export default function AnalysisContent({
  video,
  onKeep,
  onRemove,
  initiallyKept,
}: AnalysisContentProps) {
  return (
    <div className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg">
      <VideoPreviewCard video={video} />
      <OutcomeCard outcomes={video.outcomes} />
      <SummaryAccordion summary={video.summary} />
      <KeepButton
        video={video}
        onKeep={onKeep}
        onRemove={onRemove}
        initiallyKept={initiallyKept}
      />
    </div>
  );
}
