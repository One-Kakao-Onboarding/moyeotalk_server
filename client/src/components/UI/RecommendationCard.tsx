import React from 'react';
import type { Recommendation } from '@app-types/meeting.types';
import { Button } from './Button';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
      <div className="w-full h-40 bg-gradient-to-br from-profile-blue to-profile-purple flex items-center justify-center text-5xl">
        {recommendation.emoji}
      </div>
      <div className="p-4">
        <div className="text-base font-semibold text-gray-800 mb-2">{recommendation.name}</div>
        <div className="text-[13px] text-gray-600 mb-1">📍 {recommendation.location}</div>
        <div className="text-[13px] text-gray-500 leading-relaxed mb-3">{recommendation.reason}</div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 text-sm">
            공유하기
          </Button>
          <Button variant="primary" className="flex-1 text-sm">
            특별히 추천하기
          </Button>
        </div>
      </div>
    </div>
  );
};
