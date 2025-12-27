'use client';

import { TokenGrid } from './components/tokens';
import {
  TopNavBar,
  ControlBar,
  BottomNavigation,
  DesktopBottomBar,
  PulseHeader,
} from './components/layout';
import { useAppSelector } from '@/store/hooks';

export default function Home() {
  const activeRoom = useAppSelector(state => state.ui.activeRoom);

  return (
    <main className="h-screen max-h-screen flex flex-col ">
      {/* Top Navigation Bar */}
      <TopNavBar />

      {/* Control Bar */}
      <ControlBar />

      {/* Main Content */}
      <div className="flex-1 mx-1 sm:mx-4 lg:mx-6 overflow-hidden space-y-4 mt-4  sm:my-6 ">
        {/* Pulse Header */}
        <PulseHeader />
        {/* Desktop: 3-column grid */}
        <div className="hidden lg:block h-full">
          <TokenGrid singleColumn={false} />
        </div>

        {/* Mobile/Tablet: Single column */}
        <div className="lg:hidden h-full">
          <TokenGrid
            singleColumn={true}
            activeRoom={activeRoom === 'all' ? 'new_pairs' : activeRoom}
          />
        </div>
      </div>

      {/* Desktop Bottom Bar */}
      <DesktopBottomBar />

      {/* Bottom Navigation - Mobile only */}
      <BottomNavigation />
    </main>
  );
}
