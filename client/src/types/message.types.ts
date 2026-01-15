export type MessageType =
  | 'message'
  | 'system'
  | 'bot_trigger'
  | 'bot_loading'
  | 'bot_recommendation'
  | 'request_recommendation'
  | 'appointment_confirmed';

export interface BaseMessage {
  type: MessageType;
  username: string;
  content: string;
  timestamp: string;
  user_count: number;
}

export interface UserMessage extends BaseMessage {
  type: 'message';
}

export interface SystemMessage extends BaseMessage {
  type: 'system';
}

export interface BotTriggerMessage extends BaseMessage {
  type: 'bot_trigger';
  username: 'Kanana';
}

export interface BotLoadingMessage extends BaseMessage {
  type: 'bot_loading';
  username: 'Kanana';
}

export interface BotRecommendationMessage extends BaseMessage {
  type: 'bot_recommendation';
  username: 'Kanana';
}

export interface AppointmentConfirmedMessage extends BaseMessage {
  type: 'appointment_confirmed';
  username: 'Kanana';
  route: import('./meeting.types').Route;
  meetingData: import('./meeting.types').MeetingData;
  participants: string[];
}

export interface RequestRecommendationMessage {
  type: 'request_recommendation';
  username: string;
  meetingData: import('./meeting.types').MeetingData;
}

export type Message =
  | UserMessage
  | SystemMessage
  | BotTriggerMessage
  | BotLoadingMessage
  | BotRecommendationMessage
  | AppointmentConfirmedMessage;

export type WebSocketMessage = Message | RequestRecommendationMessage;
