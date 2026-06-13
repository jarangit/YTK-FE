import AnalysisContent from '../analysis/AnalysisContent';
import type { VideoAnalysis } from '../analysis/types';

interface ResultContentProps {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (videoId: string) => void;
  initiallyKept: boolean;
}

export default function ResultContent(props: ResultContentProps) {
  return <AnalysisContent {...props} />;
}
