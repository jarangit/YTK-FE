import type { VideoAnalysis } from '../analysis/types';
import OutcomeCard from '../analysis/OutcomeCard';
import VideoPreviewCard from '../analysis/VideoPreviewCard';
import ActionItemsSection from './ActionItemsSection';
import CareerInferenceSection from './CareerInferenceSection';
import EngagementQuestionsSection from './EngagementQuestionsSection';
import KeyInsightsSection from './KeyInsightsSection';
import KeywordsSection from './KeywordsSection';
import OverviewSection from './OverviewSection';
import TimelineSection from './TimelineSection';
import TranscriptSection from './TranscriptSection';

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
  const timeline = video.timeline ?? [];
  const importantPoints = video.importantPoints ?? [];
  const takeaways = video.takeaways ?? video.outcomes;
  const engagementQuestions = video.engagementQuestions ?? [];

  return (
    <div className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg">
      <VideoPreviewCard video={video} action={action} />
      <OverviewSection overview={video.overview ?? video.summary.summary} />
      <TimelineSection timeline={timeline} />
      <OutcomeCard outcomes={video.outcomes} />
      <KeyInsightsSection insights={importantPoints} />
      <ActionItemsSection items={takeaways} />
      <CareerInferenceSection careerInference={video.careerInference} />
      <EngagementQuestionsSection questions={engagementQuestions} />
      <KeywordsSection context={video.originalContext} />
      {(!hideEmptySections || hasTranscript) && (
        <TranscriptSection transcript={video.transcript} />
      )}
    </div>
  );
}
