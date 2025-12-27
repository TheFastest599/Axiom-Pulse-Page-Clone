'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveRoom } from '@/store/uiSlice';

export const MobileHeader = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useAppDispatch();
  const activeRoom = useAppSelector(state => state.ui.activeRoom);

  return (
    <header className="flex sm:hidden flex-col w-full border-b border-border/50 pb-4">
      {/* Main Row */}
      <div className="flex items-center w-full px-4 gap-2 justify-between overflow-hidden">
        {/* Left: Chain Selector + Room Tabs */}
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
          {/* Chain Selector */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-accent "
              aria-label="Switch to Solana"
            >
              <Image
                alt="SOL"
                width={20}
                height={20}
                src="/icons/solana-sol-logo.svg"
              />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full opacity-60 hover:opacity-100 hover:bg-accent/30"
              aria-label="Switch to BNB"
            >
              <Image
                alt="BNB"
                width={20}
                height={20}
                src="/icons/bnb-fill.svg"
                className="grayscale-[0.3]"
              />
            </Button>
          </div>

          {/* Room Tabs - Scrollable */}
          <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              <Button
                onClick={() => dispatch(setActiveRoom('new_pairs'))}
                className={`h-8 px-3 rounded-full text-sm font-medium whitespace-nowrap active:scale-[0.98] active:opacity-95 ${
                  activeRoom === 'new_pairs'
                    ? 'bg-secondary text-foreground'
                    : 'bg-secondary/80 text-muted-foreground active:text-foreground'
                }`}
              >
                New Pairs
              </Button>

              <Button
                onClick={() => dispatch(setActiveRoom('final_stretch'))}
                className={`h-8 px-3 rounded-full text-sm font-medium whitespace-nowrap active:scale-[0.98] active:opacity-95 ${
                  activeRoom === 'final_stretch'
                    ? 'bg-secondary text-foreground'
                    : 'bg-secondary/80 text-muted-foreground active:text-foreground'
                }`}
              >
                Final Stretch
              </Button>

              <Button
                onClick={() => dispatch(setActiveRoom('migrated'))}
                className={`h-8 px-3 rounded-full text-sm font-medium whitespace-nowrap active:scale-[0.98] active:opacity-95 ${
                  activeRoom === 'migrated'
                    ? 'bg-secondary text-foreground'
                    : 'bg-secondary/80 text-muted-foreground active:text-foreground'
                }`}
              >
                Migrated
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="min-w-9 h-9 rounded-full border-border bg-transparent active:scale-[0.96] active:bg-accent/40 flex-shrink-0"
        >
          <i
            className={`ri-arrow-up-s-line text-xl transition-transform duration-150 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </div>

      {/* Collapsible Section */}
      <div
        className={`sm:hidden w-full px-4 overflow-hidden transition-all duration-150 ${
          isExpanded ? 'max-h-[152px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-4 pt-6">
          {/* Row 1: Display, Bookmark, Settings, Question, Filter */}
          <div className="flex items-center justify-between gap-2 w-full ">
            <div className="flex items-center gap-2">
              {/* Display Dropdown */}
              <Button className="h-8 px-3 gap-2 rounded-full bg-accent active:bg-accent/80 active:scale-[0.96] flex-shrink-0">
                <i className="ri-list-check text-lg text-foreground" />
                <span className="text-sm font-bold text-foreground">
                  Display
                </span>
                <i className="ri-arrow-down-s-line text-lg text-foreground" />
              </Button>

              {/* Bookmark */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-background active:bg-accent/60 active:scale-[0.96] group flex-shrink-0"
              >
                <i className="ri-bookmark-3-line text-xl  group-active:text-foreground" />
              </Button>

              {/* Crosshair + Settings */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-background active:bg-accent/60 active:scale-[0.96] group relative flex-shrink-0"
              >
                <i className="ri-crosshair-2-line text-xl  group-active:text-foreground" />
                <i className="ri-settings-3-line text-xs text-muted-foreground group-active:text-foreground absolute bottom-0 right-[-3px]" />
              </Button>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Question */}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 flex-shrink-0"
              >
                <i className="ri-question-line text-xl text-muted-foreground hover:text-foreground" />
              </Button>

              {/* Filter Dropdown */}
              <Button className="h-8 px-3 gap-2 rounded-full bg-accent active:bg-accent/80 active:scale-[0.96] flex-shrink-0">
                <i className="ri-equalizer-3-line text-lg text-foreground" />
                <span className="text-sm font-bold text-foreground">
                  Filter
                </span>
                <i className="ri-arrow-down-s-line text-lg text-foreground" />
              </Button>
            </div>
          </div>

          {/* Row 2: Wallet Counter + Flash Input with Presets */}
          <div className="flex items-center gap-2 w-full overflow-hidden">
            {/* Wallet Counter */}
            <Button
              variant="outline"
              className="h-8 px-3 gap-2 rounded-full border-border active:bg-accent/35 active:scale-[0.96] group flex-shrink-0"
            >
              <div className="flex items-center gap-1">
                <i className="ri-wallet-line text-lg text-muted-foreground group-hover:text-foreground" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                  1
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  alt="SOL"
                  width={16}
                  height={16}
                  src="/icons/solana-sol-logo.svg"
                />
                <span className="text-sm font-medium text-foreground">0</span>
              </div>
              <i className="ri-arrow-down-s-line text-lg text-muted-foreground group-hover:text-foreground" />
            </Button>

            {/* Flash Input with Presets */}
            <div className="flex-1 min-w-0 flex h-8 items-center gap-1.5 pl-2 border border-border rounded-full active:bg-accent/35 overflow-hidden">
              <i className="ri-flashlight-fill text-sm text-muted-foreground flex-shrink-0" />

              <input
                placeholder="0.0"
                type="text"
                defaultValue="0"
                className="flex-1 w-8 min-w-0 text-sm text-foreground placeholder:text-muted-foreground font-medium outline-none bg-transparent"
              />

              <Image
                alt="SOL"
                width={16}
                height={16}
                src="/icons/solana-sol-logo.svg"
                className="flex-shrink-0"
              />

              {/* Presets */}
              <div className="flex h-full items-center gap-1 pl-1 pr-0.5 border-l border-border flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 rounded hover:bg-primary/10"
                >
                  <span className="text-[10px] font-medium text-primary hover:text-primary/80">
                    P1
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 rounded hover:bg-accent"
                >
                  <span className="text-[10px] font-medium text-muted-foreground">
                    P2
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-5 w-5 p-0 rounded-r-full rounded-l hover:bg-accent"
                >
                  <span className="text-[10px] font-medium text-muted-foreground">
                    P3
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
