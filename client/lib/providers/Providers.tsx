'use client';

import { StoreProvider } from '@/store/StoreProvider';
import { QueryProvider } from './QueryProvider';
import { WebSocketProvider } from '@/lib/hooks/useInitializeData';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <QueryProvider>
        <WebSocketProvider>{children}</WebSocketProvider>
      </QueryProvider>
    </StoreProvider>
  );
}
