import type { ChipOption } from '@app-types/meeting.types';

// 출발하는 곳 옵션
export const DEPARTURE_OPTIONS: ChipOption[] = [
  { value: '최근 방문', label: '최근 방문' },
  { value: '집', label: '집' },
  { value: '학교', label: '학교' },
  { value: '회사', label: '회사' },
];

// 만나고 싶은 곳 옵션
export const DESTINATION_OPTIONS: ChipOption[] = [
  { value: '강남', label: '강남' },
  { value: '신촌', label: '신촌' },
  { value: '홍대', label: '홍대' },
  { value: '이태원', label: '이태원' },
  { value: '명동', label: '명동' },
  { value: '건대', label: '건대' },
];

// 희망 장소 수
export const PLACE_COUNT_OPTIONS: ChipOption[] = [
  { value: '2곳', label: '2곳' },
  { value: '3곳 이상', label: '3곳 이상' },
  { value: '모름', label: '모름' },
];

// 원하는 분위기
export const MOOD_OPTIONS: ChipOption[] = [
  { value: '조용한 분위기', label: '조용한 분위기' },
  { value: '활기찬 분위기', label: '활기찬 분위기' },
  { value: '웰빙 & 휴식', label: '웰빙 & 휴식' },
  { value: '모험적인', label: '모험적인' },
  { value: '로맨틱한', label: '로맨틱한' },
  { value: '트렌디한', label: '트렌디한' },
];

// 하고 싶은 활동
export const ACTIVITY_OPTIONS: ChipOption[] = [
  { value: '카페 투어', label: '☕ 카페 투어' },
  { value: '식사하면서', label: '🍽️ 식사하면서' },
  { value: '술이나 음료', label: '🍺 술이나 음료' },
  { value: '스포츠/액티비티', label: '⚽ 스포츠/액티비티' },
  { value: '문화/예술', label: '🎨 문화/예술' },
  { value: '쇼핑', label: '🛍️ 쇼핑' },
];

export const MEETING_KEYWORDS = [
  '만나', '만날', '만남', '약속', '모임', '모이', '볼까', '볼래',
  '어디서', '어디', '장소', '언제', '시간', '몇시',
  '저녁', '점심', '밥', '식사', '커피', '술', '회식'
];
