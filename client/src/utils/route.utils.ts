import type { Route } from '@app-types';

/**
 * Parse Gemini API response to extract routes
 */
export const parseRoutes = (content: string): Route[] => {
  try {
    // Extract JSON from code block if present
    const jsonMatch = content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : content;

    // Parse JSON
    const parsed = JSON.parse(jsonString);

    // Validate and return routes
    if (parsed.routes && Array.isArray(parsed.routes)) {
      return parsed.routes;
    }

    return [];
  } catch (error) {
    console.error('Failed to parse routes:', error);
    return [];
  }
};

/**
 * Format travel time for display
 */
export const formatTravelTime = (travelTime: string): string => {
  // If already formatted (e.g., "15분"), return as is
  if (travelTime.includes('분') || travelTime.includes('시간')) {
    return travelTime;
  }

  // Parse minutes and format
  const minutes = parseInt(travelTime, 10);
  if (isNaN(minutes)) return travelTime;

  if (minutes < 60) {
    return `${minutes}분`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}시간`;
  }

  return `${hours}시간 ${mins}분`;
};
