'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveRoom } from '@/store/uiSlice';

export const TokenGridHeader = () => {
  const dispatch = useAppDispatch();
  const activeRoom = useAppSelector(state => state.ui.activeRoom);

  return (
    <div className="hidden sm:flex sticky top-0 z-30 whitespace-nowrap w-full gap-3 min-h-12 items-center pr-3 pl-1 lg:pl-3 xl:pl-3 border-b border-border">
      {/* Left: Room Tabs */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex flex-1 gap-2">
          {/* New Pairs Tab */}
          <Button
            variant="ghost"
            onClick={() => dispatch(setActiveRoom('new_pairs'))}
            className={`group relative px-3 h-10 rounded transition-colors cursor-pointer ${
              activeRoom === 'new_pairs' ? '' : 'hover:bg-accent/40'
            }`}
          >
            <div
              className={`flex items-center h-12 ${
                activeRoom === 'new_pairs'
                  ? 'border-b-2 border-foreground pt-0.5'
                  : ''
              }`}
            >
              <span
                className={`text-base font-medium ${
                  activeRoom === 'new_pairs'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                New Pairs
              </span>
            </div>
            {activeRoom !== 'new_pairs' && (
              <div className="absolute inset-0 rounded z-[1] pointer-events-none transition-opacity duration-150 opacity-0 group-hover:opacity-100 overflow-hidden">
                <div className="absolute top-0 -bottom-px -right-px -left-px rounded pointer-events-none border-muted-foreground/5 border" />
                <div className="absolute -top-px bottom-0 -right-px -left-px rounded pointer-events-none border-black/5 border" />
              </div>
            )}
          </Button>

          {/* Final Stretch Tab */}
          <Button
            variant="ghost"
            onClick={() => dispatch(setActiveRoom('final_stretch'))}
            className={`group relative px-3 h-10 rounded transition-colors cursor-pointer ${
              activeRoom === 'final_stretch' ? '' : 'hover:bg-accent/40'
            }`}
          >
            <div
              className={`flex items-center h-12 ${
                activeRoom === 'final_stretch'
                  ? 'border-b-2 border-foreground pt-0.5'
                  : ''
              }`}
            >
              <span
                className={`text-base font-medium ${
                  activeRoom === 'final_stretch'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Final Stretch
              </span>
            </div>
            {activeRoom !== 'final_stretch' && (
              <div className="absolute inset-0 rounded z-[1] pointer-events-none transition-opacity duration-150 opacity-0 group-hover:opacity-100 overflow-hidden">
                <div className="absolute top-0 -bottom-px -right-px -left-px rounded pointer-events-none border-muted-foreground/5 border" />
                <div className="absolute -top-px bottom-0 -right-px -left-px rounded pointer-events-none border-black/5 border" />
              </div>
            )}
          </Button>

          {/* Migrated Tab */}
          <Button
            variant="ghost"
            onClick={() => dispatch(setActiveRoom('migrated'))}
            className={`group relative px-3 h-10 rounded transition-colors cursor-pointer ${
              activeRoom === 'migrated' ? '' : 'hover:bg-accent/40'
            }`}
          >
            <div
              className={`flex items-center h-12 ${
                activeRoom === 'migrated'
                  ? 'border-b-2 border-foreground pt-0.5'
                  : ''
              }`}
            >
              <span
                className={`text-base font-medium ${
                  activeRoom === 'migrated'
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Migrated
              </span>
            </div>
            {activeRoom !== 'migrated' && (
              <div className="absolute inset-0 rounded z-[1] pointer-events-none transition-opacity duration-150 opacity-0 group-hover:opacity-100 overflow-hidden">
                <div className="absolute top-0 -bottom-px -right-px -left-px rounded pointer-events-none border-muted-foreground/5 border" />
                <div className="absolute -top-px bottom-0 -right-px -left-px rounded pointer-events-none border-black/5 border" />
              </div>
            )}
          </Button>
        </div>
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
              src="/images/sol-fill.svg"
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
