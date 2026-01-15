export interface MeetingData {
  departure: string;
  destination: string;
  when: string; // Date range string (e.g., "2026-01-15 ~ 2026-01-20")
  placeCount: string; // "2곳", "3곳 이상", "모름"
  mood: string;
  activity: string;
  additional: string;
}

export interface Recommendation {
  name: string;
  location: string;
  reason: string;
  emoji: string;
}

export interface Place {
  order: number; // 1차, 2차, 3차
  name: string;
  location: string;
  travelTime: string; // 예: "15분" (이전 장소에서의 소요 시간)
  reason: string;
  emoji: string;
}

export interface Route {
  routeId: number;
  title: string; // 예: "카페 투어 코스"
  places: Place[];
  totalTime: string; // 예: "2시간 30분"
}

export type ChipType = 'when' | 'mood' | 'activity';

export interface ChipOption {
  value: string;
  label: string;
}
