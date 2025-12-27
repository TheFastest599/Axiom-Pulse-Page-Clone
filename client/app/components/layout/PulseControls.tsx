'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setDisplayMode, setSelectedPreset } from '@/store/uiSlice';

export const PulseControls = () => {
  const dispatch = useAppDispatch();
  const displayMode = useAppSelector(state => state.ui.displayMode);
  const selectedPreset = useAppSelector(state => state.ui.selectedPreset);

  return (
    <div className="hidden lg:flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#0d0d0f]">
      {/* Left: Display & Icons */}
      <div className="flex items-center gap-2">
        {/* Display Dropdown */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors">
          <i className="ri-list-check text-white text-lg"></i>
          <span className="text-sm font-medium text-white">Display</span>
          <i className="ri-arrow-down-s-line text-gray-400"></i>
        </button>

        {/* Bookmark */}
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-bookmark-line text-gray-400 text-lg"></i>
        </button>

        {/* Settings Icon */}
        <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-settings-3-line text-gray-400 text-lg"></i>
        </button>
      </div>

      {/* Right: Filter, Wallet, Flash, Presets */}
      <div className="flex items-center gap-2">
        {/* Question Icon */}
        <button className="p-1 hover:bg-gray-800 rounded transition-colors">
          <i className="ri-question-line text-gray-400 text-lg"></i>
        </button>

        {/* Filter Dropdown */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors">
          <i className="ri-filter-3-line text-white text-lg"></i>
          <span className="text-sm font-medium text-white">Filter</span>
          <i className="ri-arrow-down-s-line text-gray-400"></i>
        </button>

        {/* Wallet Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg">
          <i className="ri-wallet-line text-gray-400 text-sm"></i>
          <span className="text-sm font-medium text-white">1</span>
          <i className="ri-equalizer-line text-primaryBlue text-xs"></i>
          <span className="text-sm font-medium text-white">0</span>
          <i className="ri-arrow-down-s-line text-gray-400 text-sm"></i>
        </div>

        {/* Flash Counter */}
        <div className="flex items-center gap-1">
          <i className="ri-flashlight-line text-yellow-400 text-lg"></i>
          <span className="text-sm font-medium text-white">0</span>
        </div>

        {/* SOL Icon */}
        <i className="ri-equalizer-line text-primaryBlue text-lg"></i>

        {/* Preset Buttons */}
        <div className="flex items-center gap-1">
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

//   return (
//     <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#0d0d0f]">
//       {/* Left: Display Controls */}
//       <div className="flex items-center gap-3">
//         {/* Display Dropdown - Desktop */}
//         <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
//           <i className="ri-list-check text-white text-lg"></i>
//           <span className="text-sm font-medium text-white">Display</span>
//           <i className="ri-arrow-down-s-line text-gray-400"></i>
//         </div>

//         {/* Mobile: Compact Controls */}
//         <div className="flex lg:hidden items-center gap-2">
//           <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800/50 rounded-lg">
//             <i className="ri-list-check text-white text-base"></i>
//             <span className="text-xs font-medium text-white">Display</span>
//             <i className="ri-arrow-down-s-line text-gray-400 text-sm"></i>
//           </button>
//           <button className="p-1.5 bg-gray-800/50 rounded-lg">
//             <i className="ri-bookmark-line text-gray-400 text-base"></i>
//           </button>
//           <button className="p-1.5 bg-gray-800/50 rounded-lg">
//             <i className="ri-settings-3-line text-gray-400 text-base"></i>
//           </button>
//           <button className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800/50 rounded-lg">
//             <i className="ri-filter-line text-white text-base"></i>
//             <span className="text-xs font-medium text-white">Filter</span>
//             <i className="ri-arrow-down-s-line text-gray-400 text-sm"></i>
//           </button>
//         </div>

//         {/* Presets - Desktop only */}
//         <div className="hidden lg:flex items-center gap-2">
//           <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
//             P1
//           </button>
//           <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
//             P2
//           </button>
//           <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
//             P3
//           </button>
//           <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
//             <i className="ri-more-2-line text-gray-400 text-base"></i>
//           </button>
//         </div>
//       </div>

//       {/* Right: Room Stats & Filters - Desktop only */}
//       <div className="hidden lg:flex items-center gap-4">
//         {/* Flash Icon */}
//         <button className="flex items-center gap-1">
//           <i className="ri-flashlight-line text-yellow-400 text-lg"></i>
//           <span className="text-sm font-medium text-white">0</span>
//         </button>

//         {/* Protocol Filters */}
//         <div className="flex items-center gap-2">
//           <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-400 hover:bg-gray-800 rounded transition-colors">
//             <i className="ri-equalizer-line"></i>
//             <span>P1</span>
//           </button>
//           <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
//             <span>P2</span>
//           </button>
//           <button className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors">
//             <span>P3</span>
//           </button>
//           <button className="p-1 hover:bg-gray-800 rounded transition-colors">
//             <i className="ri-more-2-line text-gray-400"></i>
//           </button>
//         </div>

//         {/* Sort Icon */}
//         <button className="p-1.5 hover:bg-gray-800 rounded transition-colors">
//           <i className="ri-sort-desc text-gray-400 text-lg"></i>
//         </button>
//       </div>
//     </div>
//   );
// };
