import React from 'react';

interface HeaderProps {
  userCount: number;
}

export const Header: React.FC<HeaderProps> = ({ userCount }) => {
  return (
    <div className="bg-kakao-yellow border-b border-kakao-yellow-dark px-4 py-3 flex items-center justify-between min-h-[56px]">
      <div className="flex items-center gap-3">
        <span className="text-2xl text-kakao-text cursor-pointer">←</span>
        <div>
          <div className="text-lg font-semibold text-kakao-text">Kanana</div>
          <div className="text-[13px] text-kakao-text opacity-70">접속자 {userCount}명</div>
        </div>
      </div>
      <div className="flex gap-4">
        <span className="text-xl text-kakao-text cursor-pointer">🔍</span>
        <span className="text-xl text-kakao-text cursor-pointer">☰</span>
      </div>
    </div>
  );
};
