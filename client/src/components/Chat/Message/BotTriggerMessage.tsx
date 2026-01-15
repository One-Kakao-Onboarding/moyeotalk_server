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
      <div className="flex flex-col max-w-[calc(100%-50px)]">
        <div className="text-[13px] font-semibold text-gray-800 mb-1">Kanana</div>
        <div className="bg-white text-gray-800 px-3 py-3 rounded-[4px_18px_18px_18px] text-[15px] leading-[1.4]">
          {message.content}
        </div>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 py-2.5 px-4 bg-white text-gray-800 border border-gray-200 rounded-lg font-semibold text-sm">
            괜찮아요
          </button>
          <button
            onClick={onRequestRecommendation}
            className="flex-1 py-2.5 px-4 bg-kakao-yellow text-kakao-text border border-kakao-yellow rounded-lg font-semibold text-sm"
          >
            네, 추천해주세요!
          </button>
        </div>
      </div>
    </div>
  );
};
