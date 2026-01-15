import React, { useState, useRef } from 'react';
import type { Route } from '@app-types';
import { RouteCard } from './RouteCard';

interface RouteSliderProps {
  routes: Route[];
  onAccept: (route: Route) => void;
  onReject?: (route: Route) => void;
  meetingData?: {
    when: string;
    destination: string;
  };
}

export const RouteSlider: React.FC<RouteSliderProps> = ({ routes, onAccept, onReject, meetingData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleReject = (route: Route) => {
    if (onReject) {
      onReject(route);
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const scrollLeft = sliderRef.current.scrollLeft;
    const containerWidth = sliderRef.current.offsetWidth;
    const cardWidth = containerWidth * 0.92 + 16; // 92% + gap
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < routes.length) {
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;

    const containerWidth = sliderRef.current.offsetWidth;
    const cardWidth = containerWidth * 0.92 + 16; // 92% + gap
    sliderRef.current.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  if (routes.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4 text-center text-gray-500">
        추천 경로를 생성할 수 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full -mx-4">
      {/* Slider Container */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: '4%',
          paddingRight: '4%',
        }}
      >
        {routes.map((route, index) => (
          <div
            key={route.routeId}
            className="flex-shrink-0 w-[92%] snap-center animate-slide-up"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both',
            }}
          >
            <RouteCard route={route} onAccept={onAccept} onReject={handleReject} meetingData={meetingData} />
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {routes.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {routes.map((route, index) => (
            <button
              key={route.routeId}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-kakao-yellow w-4'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`경로 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
