import React, { useState, useEffect } from 'react';
import type { BotLoadingMessage as BotLoadingMessageType } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';

interface BotLoadingMessageProps {
  message: BotLoadingMessageType;
}

const loadingMessages = [
  'Neu님은 아무거나 좋으시대요.',
  'Ian님은 붐비는 곳이 싫대요.',
  'Yule님과 Rudi님이 매운 음식을 원하고 있어요!',
];

export const BotLoadingMessage: React.FC<BotLoadingMessageProps> = () => {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [headerText, setHeaderText] = useState('모두가 좋아할 장소를 찾고 있어요...');
  const [showMessages, setShowMessages] = useState(true);

  useEffect(() => {
    if (currentIndex < loadingMessages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, loadingMessages[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 2000); // 2초마다 다음 메시지 표시

      return () => clearTimeout(timer);
    } else if (currentIndex === loadingMessages.length) {
      // 모든 메시지가 표시된 후 헤더 변경
      const timer = setTimeout(() => {
        setHeaderText('추천 장소를 거의 다 찾았어요...');

        // 1.5초 후 마지막 헤더로 변경하고 메시지 숨김
        setTimeout(() => {
          setHeaderText('멋진 약속 장소를 찾았어요!');
          setShowMessages(false);
        }, 1500);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <ProfileAvatar username="Kanana" variant="kanana" />
      <div className="flex flex-col w-full max-w-[calc(100%-50px)]">
        <div className="bg-white text-gray-900 px-5 py-4 rounded-2xl shadow-sm transition-all duration-500">
          {/* Header */}
          <h3 className="text-lg font-bold text-gray-900 mb-4 transition-all duration-300">
            {headerText}
          </h3>

          {/* Progressive Messages */}
          <div
            className={`space-y-3 transition-all duration-500 ${
              showMessages ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            {visibleMessages.map((msg, index) => {
              const isLatest = index === visibleMessages.length - 1;
              // Calculate opacity: 16% for oldest, 32% for second, 70% for latest
              const messagesAfter = visibleMessages.length - 1 - index;
              let opacity: number;
              if (isLatest) {
                opacity = 0.7; // 70% for latest
              } else if (messagesAfter === 1) {
                opacity = 0.32; // 32% for second
              } else {
                opacity = 0.16; // 16% for oldest
              }

              return (
                <div
                  key={index}
                  className="transition-opacity duration-500"
                  style={{ opacity }}
                >
                  {isLatest ? (
                    // Skeleton effect on text itself
                    <p className="text-base text-skeleton">{msg}</p>
                  ) : (
                    <p className="text-base" style={{ color: '#000000' }}>{msg}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
