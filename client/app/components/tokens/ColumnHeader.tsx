'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ColumnHeaderProps {
  title: string;
  count?: number;
}

export const ColumnHeader = ({ title }: ColumnHeaderProps) => {
  return (
    <div className="hidden lg:flex sticky top-0 z-30 whitespace-nowrap w-full gap-3 min-h-12 items-center pr-3 pl-1 lg:pl-3 xl:pl-3 border-b border-border">
      {/* Left: Title */}
      <div className="flex items-center gap-4 flex-1">
        <span className="text-foreground text-base font-medium flex-1">
          {title}
        </span>
      </div>

      {/* Right: Flash Input + Filter */}
      <div className="flex items-center gap-3">
        {/* Flash Input with Presets - Hidden on sm, shown on lg+ */}
        <div className="hidden lg:block">
          <div className="flex h-7 items-center gap-1.5 pl-1 border border-border rounded-full hover:bg-accent/35 transition-colors">
            <i className="ri-flashlight-fill text-sm text-muted-foreground" />

            <input
              placeholder="0.0"
              type="text"
              defaultValue="0"
              className="w-8 text-xs text-foreground placeholder:text-muted-foreground font-medium outline-none bg-transparent"
            />

            <Image
              alt="SOL"
              width={14}
              height={14}
              src="/icons/solana-sol-logo.svg"
            />

            {/* Presets */}
            <div className="flex h-full items-center gap-0.5 pl-0.5 pr-0.5 border-l border-border">
              <Button
                variant="ghost"
                size="sm"
                className="h-5.5 w-5.5 p-0 rounded hover:bg-primary/10"
              >
                <span className="text-xs font-medium text-primary hover:text-primary/80">
                  P1
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-5.5 w-5.5 p-0 rounded hover:bg-accent"
              >
                <span className="text-xs font-medium text-muted-foreground">
                  P2
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-5.5 w-5.5 p-0 rounded-r-full rounded-l hover:bg-accent"
              >
                <span className="text-xs font-medium text-muted-foreground">
                  P3
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-1 rounded hover:bg-accent/30"
        >
          <i className="ri-equalizer-3-line text-base text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};
