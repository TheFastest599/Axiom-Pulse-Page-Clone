'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveRoom } from '@/store/uiSlice';

type Room = 'new_pairs' | 'final_stretch' | 'migrated';

export const RoomTabs = () => {
  const dispatch = useAppDispatch();
  const activeRoom = useAppSelector(state => state.ui.activeRoom);
  const tabs = [
    { id: 'new_pairs' as Room, label: 'New Pairs' },
    { id: 'final_stretch' as Room, label: 'Final Stretch' },
    { id: 'migrated' as Room, label: 'Migrated' },
  ];

  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-[#0d0d0f] overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => dispatch(setActiveRoom(tab.id))}
          className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
            activeRoom === tab.id
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
