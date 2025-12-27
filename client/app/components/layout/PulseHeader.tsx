'use client';

export const PulseHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#0d0d0f]">
      {/* Left: Title & Icons */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-white">Pulse</h1>
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-equalizer-line text-primaryBlue text-lg"></i>
        </button>
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-cube-line text-gray-400 text-lg"></i>
        </button>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Question Icon - Hidden on mobile */}
        <button className="hidden lg:flex p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-question-line text-gray-400 text-lg"></i>
        </button>

        {/* Display Dropdown */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors">
          <i className="ri-list-check text-white text-lg"></i>
          <span className="text-sm font-medium text-white hidden sm:inline">
            Display
          </span>
          <i className="ri-arrow-down-s-line text-gray-400"></i>
        </button>

        {/* Bookmark - Hidden on mobile */}
        <button className="hidden lg:flex p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-bookmark-line text-gray-400 text-lg"></i>
        </button>

        {/* Grid - Hidden on mobile */}
        <button className="hidden sm:flex p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-grid-line text-gray-400 text-lg"></i>
        </button>

        {/* Volume */}
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-volume-up-line text-gray-400 text-lg"></i>
        </button>

        {/* Settings */}
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-settings-3-line text-gray-400 text-lg"></i>
        </button>

        {/* Wallet Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
          <i className="ri-wallet-line text-gray-400 text-sm"></i>
          <span className="text-sm font-medium text-white">1</span>
          <i className="ri-equalizer-line text-primaryBlue text-xs"></i>
          <span className="text-sm font-medium text-white">0</span>
          <i className="ri-arrow-down-s-line text-gray-400 text-sm hidden sm:inline"></i>
        </div>

        {/* Flash Counter - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1">
          <i className="ri-flashlight-line text-yellow-400 text-lg"></i>
          <span className="text-sm font-medium text-white">0</span>
        </div>

        {/* Preset Buttons - Hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:flex items-center gap-1">
          <button className="px-2 py-1 text-xs font-medium text-primaryBlue hover:bg-gray-800 rounded transition-colors">
            P1
          </button>
          <button className="px-2 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
            P2
          </button>
          <button className="px-2 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
            P3
          </button>
        </div>
      </div>
    </div>
  );
};
