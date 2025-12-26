'use client';

import { useAppSelector } from '@/store/hooks';
import { selectActiveRoom } from '@/store/selectors';
import { TokenColumn } from './TokenColumn';

type Room = 'new_pairs' | 'final_stretch' | 'migrated';

interface TokenGridProps {
  singleColumn?: boolean;
  activeRoom?: Room;
}

const rooms: { id: Room; title: string }[] = [
  { id: 'new_pairs', title: 'New Pairs' },
  { id: 'final_stretch', title: 'Final Stretch' },
  { id: 'migrated', title: 'Migrated' },
];

export const TokenGrid = ({
  singleColumn,
  activeRoom: propActiveRoom,
}: TokenGridProps) => {
  const storeActiveRoom = useAppSelector(selectActiveRoom);
  const activeRoom = propActiveRoom || storeActiveRoom;

  // Single column mode (mobile/tablet)
  if (singleColumn) {
    const room = activeRoom === 'all' ? 'new_pairs' : activeRoom;
    const roomData = rooms.find(r => r.id === room);

    return (
      <div className="h-full">
        <TokenColumn room={room} title={roomData?.title || 'New Pairs'} />
      </div>
    );
  }

  // Three column mode (desktop)
  return (
    <div className="h-full grid grid-cols-3">
      {rooms.map(room => (
        <TokenColumn key={room.id} room={room.id} title={room.title} />
      ))}
    </div>
  );
};
