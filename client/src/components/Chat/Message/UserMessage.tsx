import React from 'react';
import type { UserMessage as UserMessageType } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';
import { formatTime } from '@utils';

interface UserMessageProps {
  message: UserMessageType;
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <ProfileAvatar username={message.username} variant="user" />
      <div className="flex flex-col max-w-[calc(100%-50px)]">
        <div className="text-[13px] font-semibold text-gray-800 mb-1">{message.username}</div>
        <div className="bg-white text-gray-800 px-3.5 py-2.5 message-bubble-left text-[15px] leading-[1.4]">
          {message.content}
        </div>
        <div className="text-[11px] text-black/40 mt-1">{formatTime(message.timestamp)}</div>
      </div>
    </div>
  );
};
