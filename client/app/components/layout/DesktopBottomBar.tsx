'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSelectedPreset } from '@/store/uiSlice';

export const DesktopBottomBar = () => {
  const dispatch = useAppDispatch();
  const selectedPreset = useAppSelector(state => state.ui.selectedPreset);
  const wsConnected = useAppSelector(state => state.ui.wsConnected);
  const market = useAppSelector(state => state.data.market);
  const solPrice = market?.sol?.price || 0;
  const btcPrice = market?.btc?.price || 0;
  const ethPrice = market?.eth?.price || 0;
  const solChange = market?.sol?.change_24h || 0;

  return (
    <footer className="hidden sm:flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-row justify-between w-full h-9 px-6 gap-4 items-center min-w-0 border-t border-gray-700">
      {/* Left Section */}
      <div className="flex flex-row shrink-0 gap-2 justify-start items-center">
        {/* Preset Button */}
        <button className="text-primaryBlue bg-primaryBlue/20 flex flex-row h-6 px-2 gap-1 justify-start items-center rounded hover:bg-primaryBlue/25 transition-colors duration-150 ease-in-out cursor-pointer">
          <i className="ri-list-settings-line text-base"></i>
          <span className="text-xs font-semibold">PRESET {selectedPreset}</span>
        </button>

        {/* Wallet Dropdown */}
        <div className="relative flex">
          <button className="group/wallets border border-gray-700 flex flex-row h-6 pl-2 pr-1.5 gap-1.5 justify-start items-center rounded-full hover:bg-gray-700/60 transition-colors duration-125 ease-in-out cursor-pointer">
            <div className="flex flex-row gap-1 justify-start items-center">
              <i className="ri-wallet-line text-sm text-gray-400 group-hover/wallets:text-gray-300 transition-colors duration-125 ease-in-out"></i>
              <span className="text-xs group-hover/wallets:text-gray-300 font-medium text-gray-300 transition-colors duration-125 ease-in-out">
                1
              </span>
            </div>
            <div className="flex flex-row gap-1 justify-start items-center">
              <img
                alt="SOL"
                width="14"
                height="14"
                src="/icons/solana-sol-logo.svg"
              />
              <span className="text-xs font-medium text-gray-300">0</span>
            </div>
            <i className="ri-arrow-down-s-line text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-150 ease-in-out cursor-pointer"></i>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-gray-700 shrink-0"></div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 justify-start items-center">
          {/* Settings */}
          <button className="-mr-1 min-w-6 min-h-6 flex items-center justify-center text-gray-400 hover:text-gray-300 hover:bg-gray-700/40 transition-colors duration-125 ease-in-out rounded">
            <i className="ri-settings-3-line text-sm"></i>
          </button>

          {/* Wallet */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-gray-900 absolute -top-px -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <i className="text-base ri-wallet-3-line text-gray-400 hover:text-gray-300 transition-colors group-hover:text-gray-300"></i>
            <span className="text-gray-300 text-xs leading-4 font-medium whitespace-nowrap">
              Wallet
            </span>
          </button>

          {/* Twitter */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-gray-900 absolute -top-px -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <i className="text-base ri-twitter-x-line text-gray-400 hover:text-gray-300 transition-colors group-hover:text-gray-300"></i>
            <span className="text-gray-300 text-xs leading-4 font-medium whitespace-nowrap">
              Twitter
            </span>
          </button>

          {/* Discover */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-gray-900 absolute -top-px -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <i className="text-base ri-compass-3-line text-gray-400 hover:text-gray-300 transition-colors group-hover:text-gray-300"></i>
            <span className="text-gray-300 text-xs leading-4 font-medium whitespace-nowrap">
              Discover
            </span>
          </button>

          {/* Pulse */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <div className="border border-gray-900 absolute -top-px -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <i className="text-base ri-pulse-line text-gray-400 hover:text-gray-300 transition-colors group-hover:text-gray-300"></i>
            <span className="text-gray-300 text-xs leading-4 font-medium whitespace-nowrap">
              Pulse
            </span>
          </button>

          {/* PnL */}
          <button className="group relative flex flex-row gap-1 h-6 px-1 justify-start items-center rounded cursor-pointer hover:border-transparent border border-transparent hover:bg-gray-700/60">
            <i className="text-base ri-bar-chart-line text-gray-400 hover:text-gray-300 transition-colors group-hover:text-gray-300"></i>
            <span className="text-gray-300 text-xs leading-4 font-medium whitespace-nowrap">
              PnL
            </span>
          </button>
        </div>

        {/* Separator */}
        <div className="hidden lg:flex w-px h-5 bg-gray-700 shrink-0"></div>

        {/* Protocol Selector */}
        <button className="hidden lg:flex flex-row h-6 px-0 gap-1 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out">
          <div className="relative">
            <div className="relative flex flex-row h-5 px-1 gap-1 justify-start items-center rounded-full opacity-30 bg-gradient-to-r from-green-400 via-orange-400 to-red-400 w-10"></div>
            <div className="absolute inset-0.5 bg-gray-900 rounded-full flex gap-0 justify-center items-center">
              <img
                alt="Pump"
                width="11"
                height="11"
                src="/protocols/pump.svg"
              />
              <img
                alt="Bonk"
                width="11"
                height="11"
                src="/protocols/bonk.svg"
              />
              <img
                alt="Virtual Curve"
                width="11"
                height="11"
                src="/protocols/virtual-curve.svg"
              />
            </div>
          </div>
        </button>

        {/* Separator */}
        <div className="hidden lg:flex w-px h-5 bg-gray-700 shrink-0"></div>

        {/* Price Buttons */}
        <div className="flex flex-1 flex-row w-full gap-2 justify-start items-center">
          {/* BTC */}
          <button
            className="text-[#F7931A] hidden 2xl:flex flex-row shrink-0 h-6 px-0 gap-1 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out cursor-pointer"
            title="Price of BTC in USD"
          >
            <img
              alt="BTC"
              width="16"
              height="16"
              src="/icons/bitcoin-btc-logo.svg"
            />
            <span className="text-xs font-normal">${btcPrice.toFixed(2)}</span>
          </button>

          {/* ETH */}
          <button
            className="text-[#497493] hidden 2xl:flex flex-row shrink-0 h-6 px-0 gap-0.5 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out cursor-pointer"
            title="Price of ETH in USD"
          >
            <img
              alt="ETH"
              width="16"
              height="16"
              src="/icons/ethereum-eth-logo.svg"
            />
            <span className="text-xs font-normal">${ethPrice.toFixed(2)}</span>
          </button>

          {/* SOL */}
          <button
            className="text-[#14F195] hidden lg:flex flex-row shrink-0 h-6 px-0 gap-1 justify-start items-center hover:brightness-110 transition-all duration-125 ease-in-out cursor-pointer"
            title="Price of SOL in USD"
          >
            <img
              alt="SOL"
              width="16"
              height="16"
              src="/icons/solana-sol-logo.svg"
            />
            <span className="text-xs font-normal">${solPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-row shrink-0 gap-2 justify-end items-center">
        {/* Portfolio */}
        <div className="hidden 2xl:flex">
          <button className="-mr-2 group flex items-center gap-1 h-6 px-2 text-xs font-medium rounded hover:bg-gray-700/40 text-gray-400 transition-colors duration-150 ease-in-out">
            <i className="ri-funds-line text-gray-400 group-hover:text-gray-300 transition-colors duration-150 ease-in-out text-sm"></i>
            <span className="text-gray-400 text-xs font-normal group-hover:text-gray-300 transition-colors duration-150 ease-in-out">
              $50.2K
            </span>
          </button>
        </div>

        {/* Gas Price */}
        <div className="hidden 2xl:flex flex-row gap-1 justify-start items-center">
          <div className="flex flex-row gap-1 h-6 min-h-6 justify-start items-center">
            <i className="ri-gas-station-line text-gray-400 text-base"></i>
            <span className="text-gray-400 text-xs font-normal">
              0.0<sub>2</sub>37
            </span>
          </div>
        </div>

        {/* Coin Price */}
        <div className="hidden 2xl:flex flex-row gap-1 justify-start items-center">
          <div className="flex flex-row gap-1 h-6 min-h-6 justify-start items-center">
            <i className="ri-coin-line text-gray-400 text-base"></i>
            <span className="text-gray-400 text-xs font-normal">
              0.0<sub>2</sub>37
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="hidden 2xl:flex w-px h-5 bg-gray-700 shrink-0"></div>

        {/* Connection Status */}
        <div
          className={`flex flex-row h-6 xl:px-2 gap-1 justify-start items-center rounded ${
            wsConnected
              ? 'text-green-400 xl:bg-green-400/20'
              : 'text-red-400 xl:bg-red-400/20'
          }`}
        >
          <div className="flex flex-row gap-1 justify-start items-center">
            <div
              className={`bg-${
                wsConnected ? 'green' : 'red'
              }-400/20 w-3 h-3 rounded-full flex flex-row gap-1 justify-center items-center`}
            >
              <div
                className={`bg-${
                  wsConnected ? 'green' : 'red'
                }-400 w-2 h-2 rounded-full`}
              ></div>
            </div>
          </div>
          <span className="hidden xl:flex text-xs font-medium">
            {wsConnected ? 'Connection is stable' : 'Disconnected'}
          </span>
        </div>

        {/* Global Dropdown */}
        <div className="relative flex">
          <button className="flex items-center gap-1 px-2 h-6 text-xs font-medium rounded hover:bg-gray-700/40 text-gray-300 transition-colors duration-150">
            <span>GLOBAL</span>
            <i className="ri-arrow-down-s-line text-sm"></i>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-gray-700 shrink-0"></div>

        {/* Action Buttons */}
        <div className="text-gray-300 flex flex-row gap-2 justify-start items-center">
          {/* Layout */}
          <button className="flex items-center justify-center w-6 h-6 rounded transition-colors duration-150 ease-in-out text-gray-400 hover:bg-gray-700/40">
            <i className="ri-layout-top-line text-base"></i>
          </button>

          {/* Notifications */}
          <button className="text-xs hover:bg-gray-700/40 flex items-center gap-1 justify-center w-6 h-6 rounded transition-colors duration-150 ease-in-out">
            <i className="ri-notification-3-line text-base"></i>
          </button>

          {/* Palette */}
          <button className="text-xs hover:bg-gray-700/40 flex items-center gap-1 justify-center w-6 h-6 rounded transition-colors duration-150 ease-in-out">
            <i className="ri-palette-line text-base"></i>
          </button>

          {/* Separator */}
          <div className="hidden md:flex w-px h-5 bg-gray-700 shrink-0"></div>

          {/* Social Links */}
          <div className="hidden md:flex flex-row gap-4 justify-start items-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <i className="ri-discord-fill text-base"></i>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80"
            >
              <i className="ri-twitter-x-line text-base"></i>
            </a>
          </div>

          {/* Docs */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex flex-row gap-0.5 h-6 px-2 justify-start items-center rounded hover:bg-gray-700"
          >
            <i className="ri-article-line text-base"></i>
            <span className="hidden lg:flex text-xs font-normal">Docs</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
