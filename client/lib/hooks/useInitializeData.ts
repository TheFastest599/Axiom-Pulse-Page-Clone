'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import {
  setTokenSnapshot,
  setMarketData,
  setLoading,
  setError,
} from '@/store/dataSlice';
import { fetchTokensSnapshot, fetchMarketData } from '@/lib/api/queries';
import { useWebSocket } from '@/lib/websocket/useWebSocket';

export const useInitializeData = () => {
  const dispatch = useAppDispatch();

  // Fetch initial token snapshot
  const tokensQuery = useQuery({
    queryKey: ['tokens', 'snapshot'],
    queryFn: fetchTokensSnapshot,
    staleTime: Infinity, // Data is kept fresh via WebSocket
    refetchOnWindowFocus: false,
  });

  // Fetch initial market data
  const marketQuery = useQuery({
    queryKey: ['market'],
    queryFn: fetchMarketData,
    staleTime: Infinity, // Data is kept fresh via WebSocket
    refetchOnWindowFocus: false,
  });

  // Load tokens into Redux store when query succeeds
  useEffect(() => {
    if (tokensQuery.data) {
      dispatch(setTokenSnapshot({ rooms: tokensQuery.data.rooms }));
    }
  }, [tokensQuery.data, dispatch]);

  // Load market data into Redux store when query succeeds
  useEffect(() => {
    if (marketQuery.data) {
      dispatch(setMarketData(marketQuery.data.data));
    }
  }, [marketQuery.data, dispatch]);

  // Update loading state
  useEffect(() => {
    const isLoading =
      tokensQuery.isLoading ||
      tokensQuery.isFetching ||
      marketQuery.isLoading ||
      marketQuery.isFetching;
    dispatch(setLoading(isLoading));
  }, [
    tokensQuery.isLoading,
    tokensQuery.isFetching,
    marketQuery.isLoading,
    marketQuery.isFetching,
    dispatch,
  ]);

  // Update error state
  useEffect(() => {
    const error = tokensQuery.error || marketQuery.error;
    if (error) {
      dispatch(setError((error as Error).message));
    } else {
      dispatch(setError(null));
    }
  }, [tokensQuery.error, marketQuery.error, dispatch]);

  // Establish WebSocket connection after initial data is loaded
  const shouldConnectWs = tokensQuery.isSuccess && marketQuery.isSuccess;

  return {
    isLoading: tokensQuery.isLoading || marketQuery.isLoading,
    isError: tokensQuery.isError || marketQuery.isError,
    error: tokensQuery.error || marketQuery.error,
    isSuccess: tokensQuery.isSuccess && marketQuery.isSuccess,
    shouldConnectWs,
  };
};

// Component to establish WebSocket connection
export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { shouldConnectWs } = useInitializeData();

  // Only connect WebSocket after initial data is loaded
  useWebSocket(shouldConnectWs);

  return children;
};
