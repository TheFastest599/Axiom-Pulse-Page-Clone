'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveRoom } from '@/store/uiSlice';
import { selectActiveRoom, selectTokenCounts } from '@/store/selectors';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type Room = 'new_pairs' | 'final_stretch' | 'migrated';

const tabs: { id: Room; label: string }[] = [
  { id: 'new_pairs', label: 'New Pairs' },
  { id: 'final_stretch', label: 'Final Stretch' },
  { id: 'migrated', label: 'Migrated' },
];

export const TokenTabs = () => {
  const dispatch = useAppDispatch();
  const activeRoom = useAppSelector(selectActiveRoom);
  const counts = useAppSelector(selectTokenCounts);

  return (
    <Tabs
      value={activeRoom === 'all' ? 'new_pairs' : activeRoom}
      onValueChange={value => dispatch(setActiveRoom(value as Room))}
      className="w-full"
    >
      <TabsList className="w-full justify-start bg-transparent border-b border-gray-800 rounded-none h-auto p-0">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="
              px-4 py-3 rounded-none border-b-2 border-transparent
              data-[state=active]:border-blue-500 data-[state=active]:bg-transparent
              data-[state=active]:text-white text-gray-500 hover:text-gray-300
            "
          >
            {tab.label}
            <Badge
              variant="secondary"
              className="ml-2 bg-gray-800 text-gray-400 text-xs"
            >
              {counts[tab.id]}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
