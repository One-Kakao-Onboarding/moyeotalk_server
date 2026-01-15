import React from 'react';
import type { BotTriggerMessage as BotTriggerMessageType } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';

interface BotTriggerMessageProps {
  message: BotTriggerMessageType;
  onRequestRecommendation: () => void;
}

export const BotTriggerMessage: React.FC<BotTriggerMessageProps> = ({
  message,
  onRequestRecommendation,
}) => {
  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <ProfileAvatar username="Kanana" variant="kanana" />
      <div className="flex flex-col w-full max-w-[calc(100%-50px)]">
        <div className="bg-white text-gray-900 px-5 py-4 rounded-2xl text-[16px] leading-[1.5] shadow-sm">
          <p className="mb-4">{message.content}</p>
          <button
            onClick={onRequestRecommendation}
            className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold text-[17px] transition-colors"
          >
            약속 일정 추천받기
          </button>
        </div>
      </div>
    </div>
  );
};
