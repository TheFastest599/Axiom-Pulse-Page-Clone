'use client';

import { useRef, useMemo, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAppSelector } from '@/store/hooks';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColumnHeader } from './ColumnHeader';
import { TokenCard } from './TokenCard';
import { TokenColumnSkeleton } from './TokenSkeleton';

type Room = 'new_pairs' | 'final_stretch' | 'migrated';

interface TokenColumnProps {
  room: Room;
  title: string;
}

const ESTIMATED_ITEM_HEIGHT = 160; // Approximate height of TokenCard including gap

export const TokenColumn = ({ room, title }: TokenColumnProps) => {
  const tokens = useAppSelector(state => state.data.tokens[room]);
  const isLoading = useAppSelector(state => state.data.isLoading);
  const parentRef = useRef<HTMLDivElement>(null);

  // Memoize token array to prevent unnecessary recalculations
  const tokenArray = useMemo(() => Object.values(tokens), [tokens]);
  const count = tokenArray.length;

  // Virtual list configuration with dynamic measurement
  const virtualizer = useVirtualizer({
    count: tokenArray.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ITEM_HEIGHT,
    overscan: 5,
    measureElement: element => {
      return element.getBoundingClientRect().height + 4; // Add gap
    },
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="flex flex-col max-h-[80vh] lg:max-h-[85vh] bg-[#0d0d0f] border-r border-gray-800 last:border-r-0">
      <ColumnHeader title={title} count={count} />

      {isLoading ? (
        <TokenColumnSkeleton />
      ) : tokenArray.length === 0 ? (
        <div className="text-center text-gray-500 py-8 text-sm">
          No tokens in this room
        </div>
      ) : (
        <div
          ref={parentRef}
          className="flex-1 overflow-y-auto p-2 scrollbar-thin"
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualItems.map(virtualItem => {
              const token = tokenArray[virtualItem.index];
              return (
                <div
                  key={token.id}
                  data-index={virtualItem.index}
                  ref={virtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualItem.start}px)`,
                    paddingBottom: '8px',
                  }}
                >
                  <TokenCard token={token} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
