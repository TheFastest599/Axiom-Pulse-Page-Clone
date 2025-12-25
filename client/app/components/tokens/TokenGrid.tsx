'use client';

import { useAppSelector } from '@/store/hooks';
import { selectActiveRoom } from '@/store/selectors';
import { TokenColumn } from './TokenColumn';
import { TokenTabs } from './TokenTabs';

type Room = 'new_pairs' | 'final_stretch' | 'migrated';

const rooms: { id: Room; title: string }[] = [
  { id: 'new_pairs', title: 'New Pairs' },
  { id: 'final_stretch', title: 'Final Stretch' },
  { id: 'migrated', title: 'Migrated' },
];

export const TokenGrid = () => {
  const activeRoom = useAppSelector(selectActiveRoom);

  return (
    <div className="h-full flex flex-col">
      {/* Mobile Tabs - Show on sm and below lg */}
      <div className="lg:hidden">
        <TokenTabs />
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop: 3-column grid (lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-3 h-full">
          {rooms.map(room => (
            <TokenColumn key={room.id} room={room.id} title={room.title} />
          ))}
        </div>

        {/* Mobile/Tablet: Single column based on active tab */}
        <div className="lg:hidden h-full">
          <TokenColumn
            room={activeRoom === 'all' ? 'new_pairs' : activeRoom}
            title={
              rooms.find(
                r => r.id === (activeRoom === 'all' ? 'new_pairs' : activeRoom)
              )?.title || 'New Pairs'
            }
          />
        </div>
      </div>
    </div>
  );
};
