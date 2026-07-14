export type FeedbackRating =
  | 'NOT_HELPFUL'
  | 'SLIGHTLY_HELPFUL'
  | 'OKAY'
  | 'HELPFUL'
  | 'VERY_HELPFUL';

export type FeedbackReason =
  | 'SUMMARY_UNCLEAR'
  | 'CONTENT_INCOMPLETE'
  | 'TOO_LONG'
  | 'NEED_MORE_EXAMPLES'
  | 'OTHER';

export const FEEDBACK_RATINGS: FeedbackRating[] = [
  'NOT_HELPFUL',
  'SLIGHTLY_HELPFUL',
  'OKAY',
  'HELPFUL',
  'VERY_HELPFUL',
];

export const FEEDBACK_REASONS: FeedbackReason[] = [
  'SUMMARY_UNCLEAR',
  'CONTENT_INCOMPLETE',
  'TOO_LONG',
  'NEED_MORE_EXAMPLES',
  'OTHER',
];
