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
    <>
      {/* Desktop Tabs - Only on large screens */}
      <div className="hidden lg:flex items-center gap-2 px-4 py-2 border-b border-gray-800 bg-[#0d0d0f] overflow-x-auto">
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-equalizer-line text-primaryBlue text-lg"></i>
        </button>
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-cube-line text-gray-400 text-lg"></i>
        </button>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => dispatch(setActiveRoom(tab.id))}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeRoom === tab.id
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button className="ml-auto p-1.5 hover:bg-gray-800 rounded-full transition-colors">
          <i className="ri-arrow-up-s-line text-gray-400 text-lg"></i>
        </button>
      </div>

      {/* Mobile Tabs - Only on small screens */}
      <div className="flex lg:hidden items-center gap-2 px-4 py-2 border-b border-gray-800 bg-[#0d0d0f] overflow-x-auto">
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-equalizer-line text-primaryBlue text-lg"></i>
        </button>
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-cube-line text-gray-400 text-lg"></i>
        </button>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => dispatch(setActiveRoom(tab.id))}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeRoom === tab.id
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button className="ml-auto p-1.5 hover:bg-gray-800 rounded-full transition-colors">
          <i className="ri-arrow-up-s-line text-gray-400 text-lg"></i>
        </button>
      </div>
    </>
  );
};
