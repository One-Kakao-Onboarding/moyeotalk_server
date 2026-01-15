import React, { useEffect, useRef } from 'react';
import type { Message } from '@app-types';
import { useChatContext } from '@contexts';
import {
  SystemMessage,
  UserMessage,
  MyMessage,
  BotTriggerMessage,
  BotLoadingMessage,
  BotRecommendationMessage,
} from './Message';

interface MessageListProps {
  onRequestRecommendation: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({ onRequestRecommendation }) => {
  const { messages, username } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const renderMessage = (message: Message, index: number) => {
    switch (message.type) {
      case 'system':
        return <SystemMessage key={index} message={message} />;

      case 'message':
        const isMyMessage = message.username === username;
        return isMyMessage ? (
          <MyMessage key={index} message={message} />
        ) : (
          <UserMessage key={index} message={message} />
        );

      case 'bot_trigger':
        return (
          <BotTriggerMessage
            key={index}
            message={message}
            onRequestRecommendation={onRequestRecommendation}
          />
        );

      case 'bot_loading':
        return <BotLoadingMessage key={index} message={message} />;

      case 'bot_recommendation':
        return <BotRecommendationMessage key={index} message={message} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-kakao-blue scrollbar-thin">
      {messages.map((message: Message, index: number) => renderMessage(message, index))}
      <div ref={messagesEndRef} />
    </div>
  );
};
