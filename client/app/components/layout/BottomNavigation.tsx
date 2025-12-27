'use client';

import { useState } from 'react';

export const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState('pulse');

  const tabs = [
    {
      id: 'trending',
      icon: 'ri-fire-line',
      label: 'Trending',
      href: '/discover',
    },
    {
      id: 'track',
      icon: 'ri-radar-line',
      label: 'Track',
      href: '/trackers?chain=sol',
    },
    {
      id: 'pulse',
      icon: 'ri-pulse-line',
      label: 'Pulse',
      href: '/pulse?chain=sol',
    },
    {
      id: 'perpetuals',
      icon: 'ri-exchange-line',
      label: 'Perpetuals',
      href: '/perpetuals?chain=sol',
    },
    {
      id: 'account',
      icon: 'ri-folder-user-line',
      label: 'Account',
      href: '/portfolio?chain=sol',
    },
  ];

  return (
    <nav className="sm:hidden w-full right-0 h-16 bg-[#0d0d0f] border-t border-gray-800 flex items-center justify-around px-2 z-50">
      <div className="flex flex-row justify-evenly items-center w-full h-14">
        {tabs.map(tab => (
          <a key={tab.id} href={tab.href}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className="group flex flex-col justify-center items-center gap-1"
            >
              <div className="h-5 flex items-center justify-center">
                <i
                  className={`${
                    tab.icon
                  } text-xl transition-colors duration-125 ease-in-out group-active:text-gray-400 ${
                    activeTab === tab.id ? 'text-gray-300' : 'text-gray-500'
                  }`}
                  style={{ fontSize: '20px' }}
                ></i>
              </div>
              <span
                className={`text-xs leading-4 font-medium transition-colors duration-125 ease-in-out group-active:text-gray-300 ${
                  activeTab === tab.id ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          </a>
        ))}
      </div>
    </nav>
  );
};
