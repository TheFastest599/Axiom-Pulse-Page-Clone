'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateToken, updateMarketData } from '@/store/dataSlice';
import { updateTokenHistory } from '@/store/tokenHistorySlice';
import { setWsConnected } from '@/store/uiSlice';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

interface TokenUpdateMessage {
  type: 'token_update';
  room: 'new_pairs' | 'final_stretch' | 'migrated';
  timestamp: string;
  content: {
    id: string;
    delta: {
      metrics?: any;
      distribution?: any;
      security?: any;
    };
  };
}

interface MarketUpdateMessage {
  type: 'market_update';
  timestamp: string;
  data: {
    btc: {
      price: number;
      change_24h: number;
      volume_24h: number;
    };
    eth: {
      price: number;
      change_24h: number;
      volume_24h: number;
    };
    sol: {
      price: number;
      change_24h: number;
      volume_24h: number;
    };
  };
}

interface ConnectedMessage {
  type: 'connected';
  message: string;
  timestamp: string;
}

type WebSocketMessage =
  | TokenUpdateMessage
  | MarketUpdateMessage
  | ConnectedMessage;

export const useWebSocket = (enabled: boolean = true) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(state => state.data.tokens);
  const tokensRef = useRef(tokens);

  // Keep tokens ref updated
  useEffect(() => {
    tokensRef.current = tokens;
  }, [tokens]);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = () => {
    try {
      const ws = new WebSocket(`${WS_URL}/ws`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('🔌 WebSocket connected');
        dispatch(setWsConnected(true));
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = event => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);

          switch (message.type) {
            case 'token_update':
              // Update token data
              dispatch(
                updateToken({
                  room: message.room,
                  content: message.content,
                })
              );

              // Update token history for scoring
              // Find the token to get created_at
              const currentTokens = tokensRef.current;
              const token =
                currentTokens.new_pairs[message.content.id] ||
                currentTokens.final_stretch[message.content.id] ||
                currentTokens.migrated[message.content.id];

              if (token) {
                dispatch(
                  updateTokenHistory({
                    tokenId: message.content.id,
                    createdAt: token.created_at,
                    metrics: message.content.delta.metrics,
                    distribution: message.content.delta.distribution,
                  })
                );
              }
              break;

            case 'market_update':
              dispatch(updateMarketData({ data: message.data }));
              break;

            case 'connected':
              console.log('✅ WebSocket handshake:', message.message);
              break;

            default:
              console.log('📩 Unknown message type:', message);
          }
        } catch (error) {
          console.error('❌ Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = error => {
        console.error('❌ WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('🔌 WebSocket disconnected');
        dispatch(setWsConnected(false));

        // Attempt to reconnect
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current++;
          const delay = Math.min(
            1000 * Math.pow(2, reconnectAttemptsRef.current),
            30000
          );
          console.log(
            `🔄 Reconnecting in ${delay}ms... (attempt ${reconnectAttemptsRef.current})`
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          console.error('❌ Max reconnection attempts reached');
        }
      };
    } catch (error) {
      console.error('❌ Error creating WebSocket:', error);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [enabled]);

  return {
    ws: wsRef.current,
  };
};
