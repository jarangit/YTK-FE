import { apiRequest, ApiRequestError } from '../../../shared/api/httpClient';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import type { FeedbackRating, FeedbackReason } from '../types';

interface ApiEnvelope<T> {
  data: T;
  timestamp: string;
}

export interface PostFeedbackRequest {
  analysisId?: string;
  rating: FeedbackRating;
  comment?: string;
  reasons?: FeedbackReason[];
}

export interface PostFeedbackResponse {
  feedbackId: string;
  status: 'RECEIVED';
  message: string;
}

export { ApiRequestError };

export async function postFeedback({
  analysisId,
  rating,
  comment,
  reasons,
}: PostFeedbackRequest): Promise<PostFeedbackResponse> {
  const trimmedComment = comment?.trim();

  const body: Record<string, unknown> = { rating };
  if (analysisId) body.analysisId = analysisId;
  if (trimmedComment) body.comment = trimmedComment;
  if (reasons && reasons.length > 0) body.reasons = reasons;

  if (USE_MOCK_API) {
    await mockDelay(400);
    return {
      feedbackId: `mock-fb-${Date.now()}`,
      status: 'RECEIVED',
      message: 'ขอบคุณสำหรับความคิดเห็น',
    };
  }

  const response = await apiRequest<ApiEnvelope<PostFeedbackResponse>>('/feedback', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return response.data;
}
