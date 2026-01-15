import React, { useState } from 'react';
import { Input } from '@components/UI/Input';
import { Button } from '@components/UI/Button';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      alert('닉네임을 입력해주세요!');
      return;
    }
    onLogin(trimmedUsername);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-5 py-10 bg-white">
      <div className="max-w-[360px] text-center w-full">
        <div className="text-6xl mb-5">💬</div>
        <h2 className="mb-2.5 text-kakao-text text-2xl font-semibold">Kanana 채팅방</h2>
        <p className="text-gray-600 text-sm mb-10">닉네임을 입력하고 채팅을 시작하세요</p>
        <div className="space-y-3">
          <Input
            value={username}
            onChange={setUsername}
            placeholder="닉네임 입력"
            maxLength={20}
            autoComplete="off"
            onKeyPress={handleKeyPress}
          />
          <Button variant="primary" onClick={handleSubmit} className="w-full">
            입장하기
          </Button>
        </div>
      </div>
    </div>
  );
};
