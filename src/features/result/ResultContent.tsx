import type { VideoAnalysis } from '../analysis/types';
import KeepAction from '../analysis/KeepAction';
import AnalysisDetailBody from './AnalysisDetailBody';

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
  );
}
