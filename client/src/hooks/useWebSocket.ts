import { useState, useEffect, useRef, useCallback } from 'react';
import type { WebSocketMessage } from '@app-types/message.types';
import { getWebSocketUrl } from '@constants/websocket';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
type MessageCallback = (message: WebSocketMessage) => void;

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

  const wsRef = useRef<WebSocket | null>(null);
  const callbacksRef = useRef<Set<MessageCallback>>(new Set());
  const messageQueueRef = useRef<WebSocketMessage[]>([]);

  const send = useCallback((message: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      // Queue message if not connected
      messageQueueRef.current.push(message);
    }
  }, []);

  const subscribe = useCallback((callback: MessageCallback) => {
    callbacksRef.current.add(callback);

    // Return unsubscribe function
    return () => {
      callbacksRef.current.delete(callback);
    };
  }, []);

  const connect = useCallback((username: string) => {
    // Prevent duplicate connections
    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
      console.log('WebSocket already connected or connecting');
      return;
    }

    const wsUrl = getWebSocketUrl(username);
    setConnectionStatus('connecting');

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      setConnectionStatus('connected');

      // Send queued messages
      while (messageQueueRef.current.length > 0) {
        const queuedMessage = messageQueueRef.current.shift();
        if (queuedMessage) {
          ws.send(JSON.stringify(queuedMessage));
        }
      }
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;
        callbacksRef.current.forEach((callback) => callback(message));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('error');
    };

    ws.onclose = (event) => {
      console.log('WebSocket closed', event.code, event.reason);
      setIsConnected(false);
      setConnectionStatus('disconnected');

      // Only alert and reload if not a clean close
      if (event.code !== 1000 && event.code !== 1001) {
        alert('서버와의 연결이 끊어졌습니다.');
        window.location.reload();
      }
    };
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    isConnected,
    connectionStatus,
    connect,
    disconnect,
    send,
    subscribe,
  };
};
