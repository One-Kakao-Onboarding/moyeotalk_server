import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { AppointmentConfirmedMessage as AppointmentConfirmedMessageType } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';
import { useChatContext } from '@contexts';

interface AppointmentConfirmedMessageProps {
  message: AppointmentConfirmedMessageType;
}

export const AppointmentConfirmedMessage: React.FC<AppointmentConfirmedMessageProps> = ({
  message,
}) => {
  const { route, meetingData, participants } = message;
  const { sendBotMessage } = useChatContext();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // 장소 이미지 추출
  const placeImages = route.places
    .flatMap((place) => place.images || [])
    .filter((img) => img)
    .slice(0, 2);

  // Sample 이미지 사용 (랜덤으로 2개 선택)
  const allSampleImages = [
    '/sample-images/place-1.png',
    '/sample-images/place-2.png',
    '/sample-images/place-3.png',
    '/sample-images/place-4.png',
    '/sample-images/place-5.png',
    '/sample-images/place-6.png',
  ];

  const getRandomImages = () => {
    const shuffled = [...allSampleImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  };

  const displayImages = placeImages.length > 0 ? placeImages : getRandomImages();

  // 장소 리스트 (1차, 2차)
  const placesList = route.places.map((place) => place.name).join(' - ');

  // 참가자 컬러 (예시)
  const participantColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];

  const handleAddToCalendar = () => {
    alert('특캘린더에 추가되었습니다!');
  };

  const handleMakeReservation = () => {
    // Send reservation confirmation message from Kanana bot
    sendBotMessage('예약이 완료됐어요!');
  };

  // Generate confetti pieces - 화면 전체를 커버하도록 개수 증가
  const confettiPieces = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    rotation: Math.random() * 360,
    duration: 1.2 + Math.random() * 0.6, // 1.2s ~ 1.8s
    color: ['#FFD93D', '#4ECDC4', '#FF6B6B', '#FFA07A', '#95A5A6', '#FEE500', '#FF85A1', '#A855F7'][Math.floor(Math.random() * 8)],
  }));

  return (
    <>
      {/* Confetti Animation - Rendered to document.body */}
      {showConfetti && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              style={{
                position: 'absolute',
                left: `${piece.left}%`,
                top: '-20px',
                width: '12px',
                height: '12px',
                backgroundColor: piece.color,
                borderRadius: '2px',
                animation: `confettiFall ${piece.duration}s ease-out forwards`,
                animationDelay: `${piece.delay}s`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          ))}
          <style>
            {`
              @keyframes confettiFall {
                0% {
                  transform: translateY(0) rotateZ(0deg);
                  opacity: 1;
                }
                100% {
                  transform: translateY(110vh) rotateZ(720deg);
                  opacity: 0;
                }
              }
            `}
          </style>
        </div>,
        document.body
      )}

      <div className="flex items-start mb-4 animate-fade-in relative">
        <ProfileAvatar username="Kanana" variant="kanana" />
      <div className="flex flex-col gap-3 max-w-[calc(100%-50px)] w-full">
        <div className="bg-white rounded-2xl p-4 shadow-md">
          {/* Header */}
          <h2 className="text-lg font-bold text-center text-gray-900 mb-4">
            약속이 확정됐어요!
          </h2>

          {/* Images */}
          <div className="flex gap-2 mb-4">
            {displayImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`장소 이미지 ${idx + 1}`}
                className="flex-1 h-[120px] object-cover rounded-lg"
              />
            ))}
          </div>

          {/* Date & Time */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">일시</p>
            <p className="text-sm font-bold text-gray-900">{meetingData.when}</p>
          </div>

          {/* Location */}
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">위치</p>
            <p className="text-sm font-bold text-gray-900">{placesList}</p>
          </div>

          {/* Participants */}
          <div className="mb-5">
            <p className="text-xs text-gray-600 mb-2">참석자</p>
            <div className="flex -space-x-[7px]">
              {participants.map((participant, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                  style={{ backgroundColor: participantColors[idx % participantColors.length] }}
                >
                  {participant.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCalendar}
              className="flex-1 py-3 text-gray-900 font-semibold rounded-lg transition-colors text-sm"
              style={{ backgroundColor: '#F0F0F0' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E0E0E0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F0F0F0'}
            >
              특캘린더 추가
            </button>
            <button
              onClick={handleMakeReservation}
              className="flex-1 py-3 bg-kakao-yellow hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg transition-colors text-sm"
            >
              예약하기
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
