import { useState, useCallback, useEffect } from 'react';
import type { Message, MeetingData } from '@app-types';
import { useWebSocket } from './useWebSocket';

export const useChat = (username: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCount, setUserCount] = useState(0);

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

      send({
        type: 'request_recommendation',
        username,
        meetingData,
      });
    },
    [isConnected, send, username]
  );

  // Subscribe to incoming messages
  useEffect(() => {
    const unsubscribe = subscribe((message) => {
      if (message.type !== 'request_recommendation') {
        addMessage(message as Message);
      }
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
  };
};
