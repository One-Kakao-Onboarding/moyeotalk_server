import React from 'react';
import type { SystemMessage as SystemMessageType } from '@app-types';

interface SystemMessageProps {
  message: SystemMessageType;
}

export const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-center my-5 animate-fade-in">
      <div className="bg-black/30 text-white text-xs py-1.5 px-3 rounded-xl">
        {message.content}
      </div>
    </div>
  );
};
