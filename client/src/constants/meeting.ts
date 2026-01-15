import type { ChipOption } from '@app-types/meeting.types';

// 출발하는 곳 옵션
export const DEPARTURE_OPTIONS: ChipOption[] = [
  { value: '내 주변', label: '내 주변' },
  { value: '집', label: '집' },
  { value: '학교', label: '학교' },
  { value: '회사', label: '회사' },
];

// 만나고 싶은 곳 옵션
export const DESTINATION_OPTIONS: ChipOption[] = [
  { value: '현위치와 가까운 곳', label: '현위치와 가까운 곳' },
  { value: '한강진역', label: '한강진역' },
  { value: '성수역', label: '성수역' },
];

// 먹고 싶은 것
export const FOOD_OPTIONS: ChipOption[] = [
  { value: '속 편한 음식', label: '속 편한 음식' },
  { value: '매운 음식', label: '매운 음식' },
  { value: '두툼푸', label: '두툼푸' },
  { value: '와인', label: '와인' },
];

// 분위기
export const MOOD_OPTIONS: ChipOption[] = [
  { value: '조용한 장소', label: '조용한 장소' },
  { value: '인스타 감성', label: '인스타 감성' },
  { value: '힐링 분위기', label: '힐링 분위기' },
  { value: '겨식 있는', label: '겨식 있는' },
  { value: '맛집 탐방', label: '맛집 탐방' },
];

// 편의시설
export const FACILITY_OPTIONS: ChipOption[] = [
  { value: '주차 가능', label: '주차 가능' },
  { value: '깨끗한 화장실', label: '깨끗한 화장실' },
  { value: '콜키지 가능', label: '콜키지 가능' },
];

export const MEETING_KEYWORDS = [
  '만나', '만날', '만남', '약속', '모임', '모이', '볼까', '볼래',
  '어디서', '어디', '장소', '언제', '시간', '몇시',
  '저녁', '점심', '밥', '식사', '커피', '술', '회식'
];
