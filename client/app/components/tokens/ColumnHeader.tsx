'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react';

interface ColumnHeaderProps {
  title: string;
  count: number;
}

export const ColumnHeader = ({ title, count }: ColumnHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <Badge
          variant="secondary"
          className="bg-gray-800 text-gray-400 text-xs"
        >
          {count}
        </Badge>
      </div>

      <div className="flex items-center gap-1">
        {/* Sort control */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-500 hover:text-white"
        >
          <ArrowUpDown className="h-3.5 w-3.5" />
        </Button>

        {/* Filter buttons */}
        <div className="flex gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-gray-500 hover:text-white hover:bg-gray-800"
          >
            P1
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-gray-500 hover:text-white hover:bg-gray-800"
          >
            P2
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-gray-500 hover:text-white hover:bg-gray-800"
          >
            P3
          </Button>
        </div>

        {/* Additional filters */}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-gray-500 hover:text-white"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
