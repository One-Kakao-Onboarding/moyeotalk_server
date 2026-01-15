import React from 'react';
import type { Route, Place } from '@app-types';

interface RouteCardProps {
  route: Route;
  onAccept: (route: Route) => void;
  onReject: (route: Route) => void;
  meetingData?: {
    when: string;
    destination: string;
  };
}

const PlaceItem: React.FC<{ place: Place; isLast: boolean }> = ({ place, isLast }) => {
  // Sample 이미지 (6개의 실제 이미지를 랜덤으로 선택)
  const allSampleImages = [
    '/sample-images/place-1.png',
    '/sample-images/place-2.png',
    '/sample-images/place-3.png',
    '/sample-images/place-4.png',
    '/sample-images/place-5.png',
    '/sample-images/place-6.png',
  ];

  // 랜덤으로 3개 이미지 선택 (중복 없이)
  const getRandomImages = () => {
    const shuffled = [...allSampleImages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const images = place.images && place.images.length > 0 ? place.images : getRandomImages();

  const getOrderLabel = (order: number): string => {
    const labels: { [key: number]: string } = {
      1: '1차', 2: '2차', 3: '3차', 4: '4차',
    };
    return labels[order] || `${order}차`;
  };

  return (
    <div className="relative flex gap-2 pb-3">
      {/* Timeline Node with Order Label */}
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-kakao-yellow flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-gray-900">{getOrderLabel(place.order)}</span>
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-gray-300 border-l-2 border-dashed border-gray-400"></div>}
      </div>

      {/* Place Content */}
      <div className="flex-1 min-w-0">
        {/* Place Name & Category */}
        <h4 className="font-bold text-gray-900 text-sm mb-0.5">{place.name}</h4>
        {(place.category || place.distance) && (
          <p className="text-xs text-gray-600 mb-2">
            {place.category}
            {place.category && place.distance && ' • '}
            {place.distance}
          </p>
        )}

        {/* Images */}
        <div className="flex gap-1.5 mb-2 overflow-x-auto">
          {images.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${place.name} 이미지 ${idx + 1}`}
              className="w-[80px] h-[60px] object-cover rounded-md flex-shrink-0"
            />
          ))}
        </div>

        {/* Kanana's Reason */}
        <div className="bg-pink-50 rounded-md p-2 mb-2">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-4 h-4 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-gray-900">카나나의 이유</span>
          </div>
          <p className="text-xs text-gray-700 leading-snug line-clamp-2">{place.reason}</p>
        </div>

        {/* Travel Distance */}
        {!isLast && place.travelTime && (
          <div className="text-xs text-gray-500 font-medium">
            {place.travelTime}
          </div>
        )}
      </div>
    </div>
  );
};

export const RouteCard: React.FC<RouteCardProps> = ({ route, onAccept, onReject, meetingData }) => {
  // 예시 투표자 (실제로는 서버에서 받아와야 함)
  const likes = route.likes || ['Ian', 'Neu'];
  const dislikes = route.dislikes || ['Yule', 'Rudi'];

  // 사용자 컬러
  const userColors: { [key: string]: string } = {
    Ian: '#FFD93D',
    Neu: '#4ECDC4',
    Yule: '#95A5A6',
    Rudi: '#A0826D',
  };

  return (
    <div className="bg-white rounded-xl p-3 w-full shadow-md">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-base font-bold text-gray-900 mb-2">{route.title}</h3>

        {/* Meeting Info */}
        {meetingData && (
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-600">일시</span>
              <span className="text-xs font-medium text-gray-900">{meetingData.when}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-600">위치</span>
              <span className="text-xs font-medium text-gray-900">{meetingData.destination}</span>
            </div>
          </div>
        )}
      </div>

      {/* Places Timeline */}
      <div className="mb-3">
        {route.places.map((place, index) => (
          <PlaceItem
            key={place.order}
            place={place}
            isLast={index === route.places.length - 1}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onAccept(route)}
          className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-1 min-w-0"
        >
          <span className="text-base">👍</span>
          <span className="text-xs whitespace-nowrap">좋아요</span>
          {likes.length > 0 && (
            <div className="flex -space-x-1">
              {likes.map((user, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: userColors[user] || '#999' }}
                >
                  {user.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </button>
        <button
          onClick={() => onReject(route)}
          className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors flex items-center justify-center gap-1 min-w-0"
        >
          <span className="text-base">👎</span>
          <span className="text-xs whitespace-nowrap">별로에요</span>
          {dislikes.length > 0 && (
            <div className="flex -space-x-1">
              {dislikes.map((user, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: userColors[user] || '#999' }}
                >
                  {user.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
