import React from 'react';
import { MessageList } from './MessageList';
import { InputArea } from './InputArea';

interface ChatScreenProps {
  onRequestRecommendation: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ onRequestRecommendation }) => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <MessageList onRequestRecommendation={onRequestRecommendation} />
      <InputArea />
    </div>
  );
};
