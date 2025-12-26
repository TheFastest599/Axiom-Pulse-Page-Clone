'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const TokenCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col bg-[#0d0d0f] border border-gray-800 relative">
      {/* Top Right Stats */}
      <div className="absolute right-4 top-4 z-10">
        <div className="flex flex-col gap-0.5 items-end">
          <Skeleton className="h-4.5 w-20" />
          <Skeleton className="h-4.5 w-16" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-14" />
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full gap-3 pl-3 pr-3 py-2 justify-start items-center">
        {/* Token Image */}
        <div className="flex flex-col items-center gap-1">
          <Skeleton className="w-18.5 h-18.5 rounded" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Token Info */}
        <div className="flex flex-col flex-1 h-full gap-5 justify-start items-start pt-0 overflow-hidden">
          <div className="flex flex-col w-full gap-0.5 justify-start items-start min-w-0">
            {/* Token Name & Ticker */}
            <div className="flex flex-row gap-1 items-center">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Time, Social Links & Distribution */}
            <div className="flex flex-row w-full h-4.5 gap-3 justify-start items-center">
              <Skeleton className="h-4 w-8" />
              <div className="flex gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-4 h-4 rounded" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-10" />
              </div>
            </div>
          </div>

          {/* Bottom Stats Pills */}
          <div className="flex flex-row w-full h-6 gap-1 justify-start items-end">
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="absolute right-3 bottom-4 z-20">
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
};

export const TokenColumnSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 8 }).map((_, i) => (
        <TokenCardSkeleton key={i} />
      ))}
    </div>
  );
};
