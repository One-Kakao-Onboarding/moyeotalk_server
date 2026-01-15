import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useChat } from '@hooks/useChat';
import type { Message, MeetingData } from '@app-types';

interface ChatContextType {
  messages: Message[];
  userCount: number;
  username: string;
  isConnected: boolean;
  connect: (username: string) => void;
  sendMessage: (content: string) => void;
  requestRecommendation: (meetingData: MeetingData) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  username: string;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children, username }) => {
  const chat = useChat(username);

  const value: ChatContextType = useMemo(
    () => ({
      messages: chat.messages,
      userCount: chat.userCount,
      username,
      isConnected: chat.isConnected,
      connect: chat.connect,
      sendMessage: chat.sendMessage,
      requestRecommendation: chat.requestRecommendation,
    }),
    [
      chat.messages,
      chat.userCount,
      username,
      chat.isConnected,
      chat.connect,
      chat.sendMessage,
      chat.requestRecommendation,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
