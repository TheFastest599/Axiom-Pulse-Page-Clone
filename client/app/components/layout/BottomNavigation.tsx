'use client';

import { useState } from 'react';

export const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('pulse');

  const tabs = [
    { id: 'trending', icon: 'ri-fire-line', label: 'Trending' },
    { id: 'track', icon: 'ri-refresh-line', label: 'Track' },
    { id: 'pulse', icon: 'ri-line-chart-line', label: 'Pulse' },
    { id: 'perpetuals', icon: 'ri-emotion-happy-line', label: 'Perpetuals' },
    { id: 'account', icon: 'ri-user-line', label: 'Account' },
  ];

  return (
    <nav className="sm:hidden w-full right-0 h-16 bg-[#0d0d0f] border-t border-gray-800 flex items-center justify-around px-2 z-50">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-colors"
        >
          <i
            className={`${tab.icon} text-xl ${
              activeTab === tab.id ? 'text-blue-400' : 'text-gray-400'
            }`}
          ></i>
          <span
            className={`text-[0.625rem] font-medium ${
              activeTab === tab.id ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </nav>
  );
};
