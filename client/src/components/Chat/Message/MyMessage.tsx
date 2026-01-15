import React from 'react';
import type { UserMessage } from '@app-types';
import { formatTime } from '@utils';

interface MyMessageProps {
  message: UserMessage;
}

export const MyMessage: React.FC<MyMessageProps> = ({ message }) => {
  return (
    <div className="flex flex-row-reverse items-end mb-4 animate-fade-in">
      <div className="flex items-end gap-1">
        <div className="text-[11px] text-black/40">{formatTime(message.timestamp)}</div>
        <div className="bg-kakao-yellow text-kakao-text px-3.5 py-2.5 message-bubble-right text-[15px] leading-[1.4] max-w-[260px]">
          {message.content}
        </div>
      </div>
    </div>
  );
};
