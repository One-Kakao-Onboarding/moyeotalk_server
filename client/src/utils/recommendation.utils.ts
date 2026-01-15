import type { Recommendation } from '@app-types/meeting.types';

export const parseRecommendations = (text: string): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  const lines = text.split('\n');
  let currentRec: Recommendation | null = null;

  lines.forEach((line) => {
    if (line.match(/^\d+\./)) {
      if (currentRec) recommendations.push(currentRec);
      currentRec = {
        name: line.replace(/^\d+\.\s*/, ''),
        location: '강남역',
        reason: '',
        emoji: '🍽️'
      };
    } else if (currentRec && line.trim()) {
      currentRec.reason += line + ' ';
    }
  });

  if (currentRec) recommendations.push(currentRec);

  // Fallback if parsing fails
  if (recommendations.length === 0) {
    return [
      {
        name: '추천 장소 1',
        location: '강남역',
        reason: text.substring(0, 100),
        emoji: '🍽️'
      },
      {
        name: '추천 장소 2',
        location: '역삼역',
        reason: text.substring(100, 200),
        emoji: '☕'
      },
      {
        name: '추천 장소 3',
        location: '선릉역',
        reason: text.substring(200, 300),
        emoji: '🍺'
      }
    ];
  }

  return recommendations.slice(0, 3);
};
