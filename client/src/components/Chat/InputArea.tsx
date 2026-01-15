import React, { useState } from 'react';
import { useChatContext } from '@contexts';

export const InputArea: React.FC = () => {
  const { sendMessage } = useChatContext();
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex px-4 py-2.5 bg-white border-t border-gray-200 items-center gap-2">
      <button className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center cursor-pointer text-xl text-gray-600">
        +
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="메시지를 입력하세요"
        autoComplete="off"
        className="flex-1 py-2.5 px-3.5 text-[15px] border border-gray-200 rounded-[20px] bg-gray-100 focus:outline-none focus:bg-white"
      />
      <button
        onClick={handleSend}
        className={`w-8 h-8 rounded-lg border-none flex items-center justify-center cursor-pointer text-lg ${
          inputValue.trim()
            ? 'bg-kakao-yellow text-kakao-text'
            : 'bg-gray-200 text-gray-600'
        }`}
      >
        ▶
      </button>
    </div>
  );
};
