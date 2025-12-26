'use client';

export const PulseHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#0d0d0f]">
      {/* Left: Title & Icons */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white">Pulse</h1>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
            <i className="ri-equalizer-line text-blue-400 text-lg"></i>
          </button>
          <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
            <i className="ri-cube-line text-gray-400 text-lg"></i>
          </button>
          <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
            <i className="ri-question-line text-gray-400 text-lg"></i>
          </button>
        </div>
      </div>

      {/* Right: Action Icons - Hidden on mobile */}
      <div className="hidden md:flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-bookmark-line text-gray-400 text-lg"></i>
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-grid-line text-gray-400 text-lg"></i>
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-volume-up-line text-gray-400 text-lg"></i>
        </button>
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-settings-3-line text-gray-400 text-lg"></i>
        </button>
      </div>
    </div>
  );
};
