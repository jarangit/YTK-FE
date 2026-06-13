import type { MockVideo } from '../../shared/types';
import VideoPreviewCard from './VideoPreviewCard';
import OutcomeCard from './OutcomeCard';
import SummaryAccordion from './SummaryAccordion';
import KeepButton from './KeepButton';

interface ResultContentProps {
  video: MockVideo;
  onKeep: (video: MockVideo) => void;
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
