import React, { useState, useEffect } from 'react';
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
  const { sendMessage, confirmAppointment, currentMeetingData } = useChatContext();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(false);
    }, 1600); // 1.6초 후 헤더 숨김

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptRoute = (route: Route) => {
    // Send acceptance message to chat
    const acceptanceMessage = `${route.title}로 결정했어요! 🎉`;
    sendMessage(acceptanceMessage);

    // 약속 확정 화면으로 이동
    if (currentMeetingData) {
      // 임시 participants (실제로는 WebSocket에서 가져와야 함)
      const participants = ['Neu', 'Ian', 'Yule', 'Rudi'];
      confirmAppointment(route, currentMeetingData, participants);
    }
  };

  const handleRejectRoute = (route: Route) => {
    // Send rejection message to chat
    const rejectionMessage = `${route.title}는 별로예요... 다른 추천 부탁드려요!`;
    sendMessage(rejectionMessage);
  };

  const handleRequestNew = () => {
    // Send request for new recommendations
    const requestMessage = '새로운 추천 받고 싶어요!';
    sendMessage(requestMessage);
  };

  return (
    <div className="flex items-start mb-4 animate-fade-in">
      <ProfileAvatar username="Kanana" variant="kanana" />
      <div className="flex flex-col gap-3 max-w-[calc(100%-50px)] w-full">
        {showHeader && (
          <div className="bg-white text-gray-900 px-5 py-4 rounded-2xl shadow-sm transition-opacity duration-300 animate-fade-out-header">
            <h3 className="text-lg font-bold text-gray-900">
              멋진 약속 장소를 모두 찾았어요!
            </h3>
          </div>
        )}
        <RouteSlider
          routes={routes}
          onAccept={handleAcceptRoute}
          onReject={handleRejectRoute}
          onRequestNew={handleRequestNew}
          meetingData={currentMeetingData ? {
            when: currentMeetingData.when,
            destination: currentMeetingData.destination
          } : undefined}
        />
      </div>
    </div>
  );
};
