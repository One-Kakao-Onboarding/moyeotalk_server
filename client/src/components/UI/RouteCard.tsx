import React from 'react';
import type { Route, Place } from '@app-types';
import { formatTravelTime } from '@utils';

interface RouteCardProps {
  route: Route;
  onAccept: (route: Route) => void;
}

const getOrderLabel = (order: number): string => {
  const labels: { [key: number]: string } = {
    1: '1차',
    2: '2차',
    3: '3차',
    4: '4차',
  };
  return labels[order] || `${order}차`;
};

const PlaceItem: React.FC<{ place: Place; isLast: boolean }> = ({ place, isLast }) => {
  return (
    <div className="relative">
      {/* Place Card */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-start gap-3">
          {/* Order Badge */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-kakao-yellow flex items-center justify-center">
            <span className="text-sm font-bold text-kakao-text">{getOrderLabel(place.order)}</span>
          </div>

          {/* Place Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{place.emoji}</span>
              <h4 className="font-semibold text-gray-900 text-base">{place.name}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{place.location}</p>
            <p className="text-sm text-gray-700">{place.reason}</p>

            {/* Travel Time */}
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formatTravelTime(place.travelTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connector Line */}
      {!isLast && (
        <div className="flex justify-center py-2">
          <div className="w-0.5 h-6 bg-gray-300"></div>
        </div>
      )}
    </div>
  );
};

export const RouteCard: React.FC<RouteCardProps> = ({ route, onAccept }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 w-full min-w-[320px] max-w-[400px] shadow-lg">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{route.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>총 소요시간: {route.totalTime}</span>
        </div>
      </div>

      {/* Places */}
      <div className="mb-4">
        {route.places.map((place, index) => (
          <PlaceItem
            key={place.order}
            place={place}
            isLast={index === route.places.length - 1}
          />
        ))}
      </div>

      {/* Accept Button */}
      <button
        onClick={() => onAccept(route)}
        className="w-full py-3 bg-kakao-yellow hover:bg-kakao-yellow-dark text-kakao-text font-semibold rounded-lg transition-colors"
      >
        이 경로로 할래요!
      </button>
    </div>
  );
};
