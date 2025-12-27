'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const DesktopHeader = () => {
  return (
    <header className="hidden sm:flex items-center w-full h-8 gap-3">
      {/* Left Section: Title and Chain Selector */}
      <div className="flex-1 flex items-center gap-3">
        <span className="text-foreground text-xl font-medium">Pulse</span>

        {/* Chain Selector */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 rounded-full bg-accent scale-110 hover:bg-accent"
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
            className="relative h-8 w-8 rounded-full opacity-60 hover:opacity-100 hover:bg-accent/30"
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
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-4">
        {/* Question Button */}
        <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
          <i className="ri-question-line text-xl text-muted-foreground hover:text-foreground" />
        </Button>

        {/* Display Dropdown */}
        <Button className="h-8 px-3 gap-2 rounded-full bg-accent hover:bg-accent/80">
          <i className="ri-list-check text-lg text-foreground" />
          <span className="text-sm font-bold text-foreground">Display</span>
          <i className="ri-arrow-down-s-line text-lg text-foreground" />
        </Button>

        {/* Icon Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="-mr-1 h-8 w-8 rounded-full hover:bg-accent group"
        >
          <i className="icon-bookmark-x text-base text-muted-foreground group-hover:text-foreground" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="-mr-1 h-8 w-8 rounded-full hover:bg-accent group"
        >
          <i className="ri-keyboard-box-line text-base text-muted-foreground group-hover:text-foreground" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="-mr-1 h-8 w-8 rounded-full hover:bg-accent group"
        >
          <i className="ri-volume-up-line text-base text-muted-foreground group-hover:text-foreground" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-accent group relative"
        >
          <i className="ri-crosshair-2-line text-base text-muted-foreground group-hover:text-foreground" />
          <i className="ri-settings-3-line text-xs text-muted-foreground group-hover:text-foreground absolute bottom-0 right-0" />
        </Button>

        {/* Wallet Counter Dropdown */}
        <Button
          variant="outline"
          className="h-8 px-3 gap-2 rounded-full border-border hover:bg-accent/35 group"
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

        {/* Flash Input with Presets - Hidden on mobile, shown sm to lg */}
        <div className="hidden sm:block lg:hidden">
          <div className="flex h-8 min-w-[216px] items-center gap-2 pl-3 border border-border rounded-full hover:bg-accent/35">
            <i className="ri-flashlight-fill text-sm text-muted-foreground" />

            <input
              placeholder="0.0"
              type="text"
              defaultValue="0"
              className="w-full max-w-[60px] text-sm text-foreground placeholder:text-muted-foreground font-medium outline-none bg-transparent"
            />

            <Image
              alt="SOL"
              width={16}
              height={16}
              src="/icons/solana-sol-logo.svg"
            />

            {/* Presets */}
            <div className="flex h-full items-center gap-1.5 pl-1.5 pr-1 border-l border-border">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded hover:bg-primary/10"
              >
                <span className="text-xs font-medium text-primary">P1</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded hover:bg-accent"
              >
                <span className="text-xs font-medium text-muted-foreground">
                  P2
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-r-full rounded-l hover:bg-accent"
              >
                <span className="text-xs font-medium text-muted-foreground">
                  P3
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
