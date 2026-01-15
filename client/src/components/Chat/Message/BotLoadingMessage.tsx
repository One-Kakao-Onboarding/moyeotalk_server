import React from 'react';
import type { BotLoadingMessage as BotLoadingMessageType } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';

interface BotLoadingMessageProps {
  message: BotLoadingMessageType;
}

export const BotLoadingMessage: React.FC<BotLoadingMessageProps> = ({ message }) => {
  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <ProfileAvatar username="Kanana" variant="kanana" />
      <div className="flex flex-col max-w-[calc(100%-50px)]">
        <div className="text-[13px] font-semibold text-gray-800 mb-1">Kanana</div>
        <div className="bg-white text-gray-800 px-3 py-3 rounded-[4px_18px_18px_18px] text-[15px] leading-[1.4]">
          {message.content}
        </div>
      </div>
    </div>
  );
};
