'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const TokenCardSkeleton = () => {
  return (
    <Card className="bg-[#111113] border-gray-800 p-3">
      <div className="flex gap-3">
        {/* Token Image Skeleton */}
        <div className="relative flex-shrink-0">
          <Skeleton className="w-14 h-14 rounded-lg" />
        </div>

        {/* Token Info Skeleton */}
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-12" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-2 w-20" />
        </div>

        {/* Metrics Skeleton */}
        <div className="flex-shrink-0 space-y-1">
          <Skeleton className="h-3 w-16 ml-auto" />
          <Skeleton className="h-3 w-14 ml-auto" />
          <Skeleton className="h-3 w-12 ml-auto" />
          <Skeleton className="h-3 w-10 ml-auto" />
        </div>
      </div>

      {/* Bottom Stats Skeleton */}
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-800">
        <Skeleton className="h-2 w-10" />
        <Skeleton className="h-2 w-10" />
        <Skeleton className="h-2 w-10" />
        <Skeleton className="h-2 w-10" />
      </div>
    </Card>
  );
};

export const TokenColumnSkeleton = () => {
  return (
    <div className="p-2 space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <TokenCardSkeleton key={i} />
      ))}
    </div>
  );
};
