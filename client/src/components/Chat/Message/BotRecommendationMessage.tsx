import React from 'react';
import type { BotRecommendationMessage as BotRecommendationMessageType, Recommendation } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';
import { RecommendationCard } from '@components/UI/RecommendationCard';
import { parseRecommendations } from '@utils';

interface BotRecommendationMessageProps {
  message: BotRecommendationMessageType;
}

export const BotRecommendationMessage: React.FC<BotRecommendationMessageProps> = ({ message }) => {
  const recommendations = parseRecommendations(message.content);

  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <ProfileAvatar username="Kanana" variant="kanana" />
      <div className="flex flex-col gap-3 max-w-[calc(100%-50px)]">
        {recommendations.map((rec: Recommendation, index: number) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>
    </div>
  );
};
