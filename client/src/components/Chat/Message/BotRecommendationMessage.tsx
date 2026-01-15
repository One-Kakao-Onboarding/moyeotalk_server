import React from 'react';
import type { BotRecommendationMessage as BotRecommendationMessageType, Route } from '@app-types';
import { ProfileAvatar } from '@components/UI/ProfileAvatar';
import { RouteSlider } from '@components/UI/RouteSlider';
import { parseRoutes } from '@utils';
import { useChatContext } from '@contexts';

interface BotRecommendationMessageProps {
  message: BotRecommendationMessageType;
}

export const BotRecommendationMessage: React.FC<BotRecommendationMessageProps> = ({ message }) => {
  const routes = parseRoutes(message.content);
  const { sendMessage } = useChatContext();

  const handleAcceptRoute = (route: Route) => {
    // Send acceptance message to chat
    const acceptanceMessage = `${route.title}로 결정했어요! 🎉`;
    sendMessage(acceptanceMessage);
  };

  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <ProfileAvatar username="Kanana" variant="kanana" />
      <div className="flex flex-col gap-3 max-w-[calc(100%-50px)] w-full">
        <div className="text-[13px] font-semibold text-gray-800 mb-1">Kanana</div>
        <RouteSlider routes={routes} onAccept={handleAcceptRoute} />
      </div>
    </div>
  );
};
