export const getWebSocketUrl = (username: string): string => {
  // In development, connect directly to backend server
  // In production, use the same host as the frontend
  if (import.meta.env.DEV) {
    return `ws://localhost:8000/ws/${encodeURIComponent(username)}`;
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws/${encodeURIComponent(username)}`;
};

export const WEBSOCKET_RECONNECT_DELAY = 3000; // 3 seconds
export const WEBSOCKET_MAX_RECONNECT_ATTEMPTS = 5;
