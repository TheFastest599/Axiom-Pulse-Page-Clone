'use client';

import { Skeleton } from '@/components/ui/skeleton';

export const TokenCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col border border-border/50 relative min-h-[120px] p-3">
      {/* Top Right */}
      <div className="absolute right-3 top-3">
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Main Content */}
      <div className="flex gap-3">
        {/* Image */}
        <Skeleton className="w-16 h-16 rounded shrink-0" />

        {/* Info */}
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
          <div className="flex gap-1 mt-2">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom Right Button */}
      <div className="absolute right-3 bottom-3">
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
};

export const TokenColumnSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <TokenCardSkeleton key={i} />
      ))}
    </div>
  );
};
