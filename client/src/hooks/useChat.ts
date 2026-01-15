import { useState, useCallback, useEffect } from 'react';
import type { Message, MeetingData, Route, AppointmentConfirmedMessage } from '@app-types';
import { useWebSocket } from './useWebSocket';

export const useChat = (username: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [currentMeetingData, setCurrentMeetingData] = useState<MeetingData | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);

  const { isConnected, connectionStatus, connect, disconnect, send, subscribe } = useWebSocket();

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
    if (message.user_count !== undefined) {
      setUserCount(message.user_count);
    }
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      if (!isConnected || !content.trim()) return;

      send({
        type: 'message',
        username,
        content,
        timestamp: new Date().toISOString(),
        user_count: userCount,
      });
    },
    [isConnected, send, username, userCount]
  );

  const requestRecommendation = useCallback(
    (meetingData: MeetingData) => {
      if (!isConnected) return;

      // meetingData 저장
      setCurrentMeetingData(meetingData);

      // 즉시 로딩 메시지를 로컬에 추가
      const loadingMessage: Message = {
        type: 'bot_loading',
        username: 'Kanana',
        content: '장소를 추천하고 있어요... 🤔',
        timestamp: new Date().toISOString(),
        user_count: userCount,
      };
      addMessage(loadingMessage);

      // 서버에 추천 요청
      send({
        type: 'request_recommendation',
        username,
        meetingData,
      });
    },
    [isConnected, send, username, userCount, addMessage]
  );

  const confirmAppointment = useCallback(
    (route: Route, meetingData: MeetingData, participants: string[]) => {
      // 약속 확정 메시지 추가
      const appointmentMessage: AppointmentConfirmedMessage = {
        type: 'appointment_confirmed',
        username: 'Kanana',
        content: '약속이 확정되었습니다!',
        timestamp: new Date().toISOString(),
        user_count: userCount,
        route,
        meetingData,
        participants,
      };
      addMessage(appointmentMessage);
    },
    [userCount, addMessage]
  );

  // Subscribe to incoming messages
  useEffect(() => {
    const unsubscribe = subscribe((message) => {
      // 추천 요청 메시지는 무시
      if (message.type === 'request_recommendation') {
        return;
      }

      // 서버에서 오는 bot_loading 메시지는 무시 (이미 로컬에 추가했음)
      if (message.type === 'bot_loading') {
        return;
      }

      // bot_recommendation 메시지가 오면 기존 bot_loading 메시지를 제거하고 추가
      if (message.type === 'bot_recommendation') {
        setMessages((prev) => {
          // bot_loading 메시지를 제거
          const filtered = prev.filter((msg) => msg.type !== 'bot_loading');
          // 새 추천 메시지 추가
          return [...filtered, message as Message];
        });
        if (message.user_count !== undefined) {
          setUserCount(message.user_count);
        }
        return;
      }

      // 그 외 메시지는 정상 추가
      addMessage(message as Message);
    });

    return unsubscribe;
  }, [subscribe, addMessage]);

  return {
    messages,
    userCount,
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
    requestRecommendation,
    confirmAppointment,
    currentMeetingData,
  };
};
