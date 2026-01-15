import type { ChipOption } from '@app-types/meeting.types';

export const WHEN_OPTIONS: ChipOption[] = [
  { value: '오늘', label: '오늘' },
  { value: '내일', label: '내일' },
  { value: '이번 주말', label: '이번 주말' },
  { value: '다음 주', label: '다음 주' },
];

export const MOOD_OPTIONS: ChipOption[] = [
  { value: '조용한', label: '조용한' },
  { value: '활기찬', label: '활기찬' },
  { value: '아늑한', label: '아늑한' },
  { value: '모던한', label: '모던한' },
];

export const ACTIVITY_OPTIONS: ChipOption[] = [
  { value: '식사', label: '식사' },
  { value: '커피', label: '커피' },
  { value: '술', label: '술' },
  { value: '디저트', label: '디저트' },
];

export const MEETING_KEYWORDS = [
  '만나', '만날', '만남', '약속', '모임', '모이', '볼까', '볼래',
  '어디서', '어디', '장소', '언제', '시간', '몇시',
  '저녁', '점심', '밥', '식사', '커피', '술', '회식'
];
