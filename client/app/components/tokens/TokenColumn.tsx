'use client';

import { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAppSelector } from '@/store/hooks';
import { selectTokenScores } from '@/store/selectors';
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
  const scores = useAppSelector(selectTokenScores);
  const isLoading = useAppSelector(state => state.data.isLoading);
  const parentRef = useRef<HTMLDivElement>(null);

  // Memoize sorted token array with scores
  const sortedTokens = useMemo(() => {
    const tokenArray = Object.values(tokens);

    // Sort by score (descending), then by lastTradeAt (most recent first)
    return tokenArray
      .map(token => ({
        token,
        score: scores[token.id] || null,
      }))
      .sort((a, b) => {
        const scoreA = a.score?.score ?? 0;
        const scoreB = b.score?.score ?? 0;

        if (scoreB !== scoreA) {
          return scoreB - scoreA;
        }

        const timeA = a.score?.lastTradeAt
          ? new Date(a.score.lastTradeAt).getTime()
          : 0;
        const timeB = b.score?.lastTradeAt
          ? new Date(b.score.lastTradeAt).getTime()
          : 0;
        return timeB - timeA;
      })
      .map((item, index) => ({
        ...item,
        rank: index + 1,
        isTopPriority: index < 5,
        isDeprioritized:
          (item.score?.score ?? 0) <= 2 || !item.score?.isRecentlyActive,
      }));
  }, [tokens, scores]);

  const count = sortedTokens.length;

  // Virtual list configuration with dynamic measurement
  const virtualizer = useVirtualizer({
    count: sortedTokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATED_ITEM_HEIGHT,
    overscan: 5,
    measureElement: element => {
      return element.getBoundingClientRect().height + 4;
    },
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div className="flex flex-col max-h-[80vh] lg:max-h-[85vh] bg-[#0d0d0f] border-r border-gray-800 last:border-r-0">
      <ColumnHeader title={title} count={count} />

      {isLoading ? (
        <TokenColumnSkeleton />
      ) : sortedTokens.length === 0 ? (
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
              const item = sortedTokens[virtualItem.index];
              return (
                <div
                  key={item.token.id}
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
                  <TokenCard
                    token={item.token}
                    score={item.score}
                    rank={item.rank}
                    isTopPriority={item.isTopPriority}
                    isDeprioritized={item.isDeprioritized}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
