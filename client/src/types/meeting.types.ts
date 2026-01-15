export interface MeetingData {
  departure: string;
  destination: string;
  when: string;
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

export type ChipType = 'when' | 'mood' | 'activity';

export interface ChipOption {
  value: string;
  label: string;
}
