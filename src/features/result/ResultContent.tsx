import { useEffect } from 'react';
import type { VideoAnalysis } from '../analysis/types';
import KeepAction from '../analysis/KeepAction';
import AnalysisDetailBody from './AnalysisDetailBody';
import FeedbackForm from '../feedback/FeedbackForm';
import { useExitFeedbackGuard } from '../feedback/ExitFeedbackContext';

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
  const { registerResultAnalysis, unregisterResultAnalysis, markFeedbackGiven } = useExitFeedbackGuard();

  useEffect(() => {
    registerResultAnalysis(video.analysisId);
    return unregisterResultAnalysis;
  }, [video.analysisId, registerResultAnalysis, unregisterResultAnalysis]);

  return (
    <>
      <AnalysisDetailBody
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
      <div className="mx-auto max-w-read mt-stack-lg">
        <FeedbackForm analysisId={video.analysisId} onSubmitSuccess={markFeedbackGiven} />
      </div>
    </>
  );
}
