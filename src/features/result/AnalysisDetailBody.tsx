import type { VideoAnalysis } from '../analysis/types';
import OutcomeCard from '../analysis/OutcomeCard';
import VideoPreviewCard from '../analysis/VideoPreviewCard';
import ActionItemsSection from './ActionItemsSection';
import KeyInsightsSection from './KeyInsightsSection';
import KeywordsSection from './KeywordsSection';
import OverviewSection from './OverviewSection';
import TranscriptSection from './TranscriptSection';
import WorthItSection from './WorthItSection';

interface AnalysisDetailBodyProps {
  video: VideoAnalysis;
  action?: React.ReactNode;
  hideEmptySections?: boolean;
}

export default function AnalysisDetailBody({
  video,
  action,
  hideEmptySections = false,
}: AnalysisDetailBodyProps) {
  const hasTranscript = video.transcript.length > 0;

  return (
    <div className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg">
      <VideoPreviewCard video={video} action={action} />
      <OverviewSection summary={video.summary} />
      <WorthItSection worthIt={video.summary.worthIt} />
      <OutcomeCard outcomes={video.outcomes} />
      <KeyInsightsSection insights={video.summary.keyInsights} />
      <ActionItemsSection items={video.summary.practicalTakeaways} />
      <KeywordsSection keywords={video.keywords} />
      {(!hideEmptySections || hasTranscript) && (
        <TranscriptSection transcript={video.transcript} />
      )}
    </div>
  );
}
