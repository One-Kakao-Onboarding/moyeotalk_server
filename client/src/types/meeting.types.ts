export interface MeetingData {
  departure: string;
  destination: string;
  when: string; // Date range string (e.g., "2026-01-15 ~ 2026-01-20")
  foods: string[]; // Multiple selection
  moods: string[]; // Multiple selection
  facilities: string[]; // Multiple selection
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
  category?: string; // 예: "중식", "카페"
  distance?: string; // 예: "여기서 3.7km"
  travelTime: string; // 예: "15분" (이전 장소에서의 소요 시간)
  reason: string;
  emoji: string;
  images?: string[]; // 장소 이미지 URL 배열
}

export interface Route {
  routeId: number;
  title: string; // 예: "카페 투어 코스"
  places: Place[];
  totalTime: string; // 예: "2시간 30분"
  likes?: string[]; // 좋아요를 누른 사용자들
  dislikes?: string[]; // 별로에요를 누른 사용자들
}

export type ChipType = 'when' | 'mood' | 'activity';

export interface ChipOption {
  value: string;
  label: string;
}
