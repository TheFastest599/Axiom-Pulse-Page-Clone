'use client';

import { TokenGrid } from './components/tokens';
import {
  TopNavBar,
  ControlBar,
  RoomTabs,
  BottomNavigation,
  DesktopBottomBar,
} from './components/layout';
import { useAppSelector } from '@/store/hooks';

export default function Home() {
  const activeRoom = useAppSelector(state => state.ui.activeRoom);

  return (
    <div className="h-screen flex flex-col bg-[#0d0d0f]">
      {/* Top Navigation Bar */}
      <TopNavBar />

      {/* Control Bar */}
      <ControlBar />

      {/* Room Tabs - Mobile/Tablet only */}
      <div className="lg:hidden">
        <RoomTabs />
      </div>

      {/* Main Content */}
      <main className="flex-1 mx-1 sm:mx-4 lg:mx-6 overflow-hidden mb-0  sm:mb-6">
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
      </main>

      {/* Desktop Bottom Bar */}
      <DesktopBottomBar />

      {/* Bottom Navigation - Mobile only */}
      <BottomNavigation />
    </div>
  );
}
