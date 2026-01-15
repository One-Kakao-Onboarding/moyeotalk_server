import React from 'react';
import type { AppointmentConfirmedMessage as AppointmentConfirmedMessageType } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';

interface AppointmentConfirmedMessageProps {
  message: AppointmentConfirmedMessageType;
}

export const AppointmentConfirmedMessage: React.FC<AppointmentConfirmedMessageProps> = ({
  message,
}) => {
  const { route, meetingData, participants } = message;

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
    alert('예약하기 기능은 준비 중입니다!');
  };

  return (
    <div className="flex items-start mb-4 animate-fade-in">
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
            <div className="flex gap-2">
              {participants.map((participant, idx) => (
                <div
                  key={idx}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
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
              className="flex-1 py-3 bg-kakao-yellow hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg transition-colors text-sm"
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
  );
};
