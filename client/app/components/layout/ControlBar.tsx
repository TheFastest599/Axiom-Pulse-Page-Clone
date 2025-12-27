'use client';

import { Button } from '@/components/ui/button';

export function ControlBar() {
  return (
    <div className="grayscale-25 hover:grayscale-0 transition-[filter] relative hidden sm:flex items-center w-full h-7 gap-2 px-4 pb-px overflow-hidden border-b  sm:border-border/50">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
        title="Settings"
      >
        <i className="ri-settings-3-line text-sm" />
      </Button>

      <div className="h-4 border-l border-border" />

      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 p-0 text-foreground hover:bg-accent cursor-pointer"
        title="Watchlist"
      >
        <i className="ri-star-line text-sm" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
        title="Active Positions"
      >
        <i className="ri-line-chart-line text-sm" />
      </Button>

      <div className="h-4 border-l border-border" />

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex gap-px pt-px overflow-x-auto scrollbar-hide">
          {/* Ticker content will go here */}
        </div>
      </div>
    </div>
  );
}
