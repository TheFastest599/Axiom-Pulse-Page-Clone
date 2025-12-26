'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setActiveNavTab } from '@/store/uiSlice';

export const TopNavBar = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(state => state.ui.activeNavTab);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden sm:flex flex-row border-b border-gray-700 overflow-hidden  w-full h-13 sm:h-16 min-h-12 sm:min-h-16 px-4 sm:px-4 lg:px-6 gap-4 sm:gap-4 lg:gap-6 justify-between sm:justify-start items-center">
        {/* Left: Logo */}
        <div className="flex flex-row shrink-0 gap-0 justify-start items-center w-9 sm:w-6 2xl:w-32">
          <a href="/?chain=sol">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9 text-gray-300"
                >
                  <g clipPath="url(#clip0_88_28967)">
                    <path
                      d="M24.1384 17.3876H11.8623L18.0001 7.00012L24.1384 17.3876Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M31 29.0003L5 29.0003L9.96764 20.5933L26.0324 20.5933L31 29.0003Z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_88_28967">
                      <rect
                        width="26"
                        height="22"
                        fill="white"
                        transform="translate(5 7)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
                <svg
                  width="102"
                  height="21"
                  viewBox="0 0 103 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-w-25 hidden 2xl:block text-gray-300"
                >
                  <path
                    d="M56.1914 18.3745V1.33447H59.7434L64.8074 15.3265L69.8714 1.33447H73.4234V18.3745H70.8314V5.89447L66.2474 18.3505H63.3674L58.7834 5.89447V18.3745H56.1914Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M45.9362 18.7584C40.9922 18.7584 37.9922 15.3984 37.9922 9.87844C37.9922 4.35844 40.9922 0.950439 45.9362 0.950439C50.9282 0.950439 53.9042 4.35844 53.9042 9.87844C53.9042 15.3984 50.9282 18.7584 45.9362 18.7584ZM45.9362 16.3824C49.2482 16.3824 51.2162 13.9824 51.2162 9.87844C51.2162 5.77444 49.2482 3.32644 45.9362 3.32644C42.6482 3.32644 40.6802 5.77444 40.6802 9.87844C40.6802 13.9824 42.6482 16.3824 45.9362 16.3824Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M33.1055 18.3745V1.33447H35.6975V18.3745H33.1055Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M16.9023 18.3745L22.5663 9.83047L16.9503 1.33447H19.9983L24.1983 7.81447L28.3263 1.33447H31.3503L25.7343 9.78247L31.4223 18.3745H28.3743L24.1503 11.7985L19.9263 18.3745H16.9023Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M0.980469 18.3745L7.12447 1.33447H10.4125L16.5565 18.3745H13.7965L12.2365 13.9345H5.27647L3.74047 18.3745H0.980469ZM6.09247 11.5825H11.4445L8.75647 3.80647L6.09247 11.5825Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M99.2929 18.6624C97.0311 18.6624 95.5703 16.9661 95.5703 14.3116C95.5703 11.6571 97.0311 9.96069 99.2929 9.96069C101.539 9.96069 103 11.6571 103 14.3116C103 16.9661 101.539 18.6624 99.2929 18.6624ZM99.2929 17.6729C100.926 17.6729 101.916 16.4006 101.916 14.3116C101.916 12.2225 100.926 10.9502 99.2929 10.9502C97.6437 10.9502 96.6541 12.2225 96.6541 14.3116C96.6541 16.4006 97.6437 17.6729 99.2929 17.6729Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M90.9961 18.4742V10.1494H91.8914L91.9385 11.7987C92.2684 10.6835 92.9438 10.1494 94.0276 10.1494H94.7501V11.1547H93.9962C92.7396 11.1547 92.0328 12.0186 92.0328 13.4008V18.4742H90.9961Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M81.2461 18.4741V7.32202H85.1572C87.6075 7.32202 89.0525 8.57859 89.0525 10.6519C89.0525 12.7253 87.6075 13.9818 85.1572 13.9818H82.3142V18.4741H81.2461ZM82.3142 12.9452H85.1572C86.9792 12.9452 87.9216 12.1441 87.9216 10.6519C87.9216 9.14405 86.9792 8.35869 85.1572 8.35869H82.3142V12.9452Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Navigation */}
        <div className="relative hidden sm:flex flex-1 min-w-0">
          <div className="flex lg:hidden absolute right-0 top-0 w-8 h-full z-40 bg-gradient-to-l from-gray-900 to-transparent  items-center justify-end pointer-events-none">
            <button
              type="button"
              className="absolute right-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-300 transition-all duration-125 ease-in-out opacity-0"
            >
              <i className="ri-arrow-right-wide-line text-xl mb-0.5"></i>
            </button>
          </div>
          <div className="flex overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-row gap-1 justify-start items-center">
              {[
                {
                  id: 'discover',
                  label: 'Discover',
                  href: '/discover?chain=sol',
                },
                { id: 'pulse', label: 'Pulse', href: '/pulse?chain=sol' },
                {
                  id: 'trackers',
                  label: 'Trackers',
                  href: '/trackers?chain=sol',
                },
                {
                  id: 'perpetuals',
                  label: 'Perpetuals',
                  href: '/perpetuals?chain=sol',
                },
                { id: 'yield', label: 'Yield', href: '/yield?chain=sol' },
                { id: 'vision', label: 'Vision', href: '/vision?chain=sol' },
                {
                  id: 'portfolio',
                  label: 'Portfolio',
                  href: '/portfolio?chain=sol',
                },
                { id: 'rewards', label: 'Rewards', href: '/rewards?chain=sol' },
              ].map(tab => (
                <div key={tab.id}>
                  <a href={tab.href}>
                    <button
                      className={`flex flex-row h-8 text-nowrap px-2 xl:px-3.5 justify-start items-center [transition:none] duration-0 hover:bg-primaryBlue/20 hover:text-primaryBlue hover:[transition:background-color_135ms_ease-in-out,color_135ms_ease-in-out] rounded ${
                        activeTab === tab.id
                          ? 'text-primaryBlue'
                          : 'text-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Search, SOL, Deposit, User */}
        <div className="flex flex-row gap-4 justify-start items-center">
          <div></div>
          <div>
            <button
              type="button"
              className="hidden sm:flex shrink-0 whitespace-nowrap border-gray-700 font-normal border flex-row h-8 sm:px-2 md:px-2 lg:px-2 2xl:pl-3 2xl:pr-1.5 gap-2 justify-center items-center rounded-full hover:bg-gray-700/35 transition-colors duration-125 cursor-pointer"
            >
              <i className="pt-0 ri-search-2-line text-lg text-gray-300"></i>
              <span className="text-xs text-gray-400 font-medium hidden 2xl:block">
                Search by token or CA...
              </span>
              <div className="hidden 2xl:block border-gray-700 border text-xs h-5 flex-row px-2 gap-2 justify-center items-center rounded-full">
                <span className="text-gray-300">/</span>
              </div>
            </button>
          </div>
          <div>
            <div className="hidden sm:block">
              <div className="relative flex">
                <div data-state="closed" className="w-full">
                  <button
                    className="hover:brightness-125 border-2 flex shrink-0 flex-row h-8 pl-2 pr-1.5 gap-1.5 justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-95"
                    type="button"
                    style={{ borderColor: 'rgba(20, 241, 149, 0.1)' }}
                  >
                    <img
                      alt="Solana"
                      loading="lazy"
                      width="16"
                      height="16"
                      decoding="async"
                      data-nimg="1"
                      src="/icons/solana-sol-logo.svg"
                      style={{ color: 'transparent' }}
                    />
                    <span className="text-sm text-gray-300 font-medium">
                      SOL
                    </span>
                    <i className="text-gray-300 ri-arrow-down-s-line text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="hidden sm:flex bg-primaryBlue h-8 px-3 flex-row justify-start items-center rounded-full hover:bg-primaryBlue/80">
            <span className="text-nowrap text-black text-sm font-bold">
              Deposit
            </span>
          </button>
          <div className="flex sm:hidden items-center gap-2">
            <div className="relative flex">
              <div data-state="closed" className="w-full">
                <button
                  className="hover:brightness-125 border-2 flex shrink-0 flex-row h-8 pl-2 pr-1.5 gap-1.5 justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-95"
                  type="button"
                  style={{ borderColor: 'rgba(20, 241, 149, 0.1)' }}
                >
                  <img
                    alt="Solana"
                    loading="lazy"
                    width="16"
                    height="16"
                    decoding="async"
                    data-nimg="1"
                    src="/icons/solana-sol-logo.svg"
                    style={{ color: 'transparent' }}
                  />
                  <span className="text-sm text-gray-300 font-medium">SOL</span>
                  <i className="text-gray-300 ri-arrow-down-s-line text-lg"></i>
                </button>
              </div>
            </div>
            <div className="relative flex">
              <div data-state="closed" className="w-full">
                <button className="bg-gray-700 hover:bg-gray-600/80 flex flex-row h-8 px-2 gap-1 justify-center items-center rounded-full">
                  <i className="text-gray-300 ri-global-line text-base sm:text-lg"></i>
                  <span className="text-xs sm:text-sm text-nowrap font-medium">
                    GLOBAL
                  </span>
                  <i className="text-gray-300 ri-arrow-down-s-line text-base sm:text-lg"></i>
                </button>
              </div>
            </div>
            <div className="relative flex">
              <div data-state="closed" className="w-full">
                <button className="relative bg-gray-700 hover:bg-gray-600/80 flex flex-row w-8 h-8 sm:w-8 sm:h-8 px-2.5 sm:px-3 gap-2 justify-center items-center rounded-full">
                  <i className="text-gray-300 ri-notification-3-line text-base sm:text-lg"></i>
                </button>
              </div>
            </div>
            <div className="relative flex">
              <div data-state="closed" className="w-full">
                <button className="bg-gray-700 hover:bg-gray-600/80 flex flex-row w-8 h-8 sm:w-8 sm:h-8 px-2.5 sm:px-3 gap-2 justify-center items-center rounded-full">
                  <i className="text-gray-300 ri-wallet-line text-base sm:text-lg"></i>
                </button>
              </div>
            </div>
            <div className="relative flex">
              <div data-state="closed" className="w-full">
                <button className="bg-gray-700 hover:bg-gray-600/80 flex flex-row w-8 h-8 sm:w-8 sm:h-8 px-2.5 sm:px-3 gap-2 justify-center items-center rounded-full">
                  <i className="text-gray-300 ri-user-settings-line text-base sm:text-lg"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-4">
            <button className="bg-gray-700 hover:bg-gray-600/80 flex flex-row w-8 h-8 px-3 gap-2 justify-center items-center rounded-full">
              <i className="text-gray-300 ri-star-line text-lg"></i>
            </button>
            <div className="relative flex">
              <div data-state="closed" className="w-full">
                <button className="relative bg-gray-700 hover:bg-gray-600/80 flex flex-row w-8 h-8 px-3 gap-2 justify-center items-center rounded-full">
                  <i className="text-gray-300 ri-notification-3-line text-lg"></i>
                </button>
              </div>
            </div>
            <div className="relative flex">
              <div className="w-full" data-state="closed">
                <div className="shrink-0">
                  <button className="w-fit min-w-max bg-gray-700 flex flex-row h-8 px-3 py-2 gap-2 justify-center items-center rounded-full hover:bg-gray-600/80 transition-colors">
                    <i className="text-gray-300 ri-wallet-line text-lg"></i>
                    <div className="hidden xl:flex shrink-0 whitespace-nowrap flex-row gap-1 justify-start items-center">
                      <img
                        alt="SOL"
                        loading="lazy"
                        width="16"
                        height="16"
                        decoding="async"
                        data-nimg="1"
                        src="/icons/solana-sol-logo.svg"
                        style={{ color: 'transparent' }}
                      />
                      <span className="text-sm font-semibold text-gray-300">
                        0
                      </span>
                    </div>
                    <div className="hidden xl:block shrink-0 w-px h-full bg-gray-600"></div>
                    <div className="hidden xl:flex shrink-0 whitespace-nowrap flex-row gap-1 justify-start items-center">
                      <img
                        alt="USDC"
                        loading="lazy"
                        width="18"
                        height="28"
                        decoding="async"
                        data-nimg="1"
                        src="/icons/usdc-perps.svg"
                        style={{ color: 'transparent' }}
                      />
                      <span className="text-sm font-semibold text-gray-300">
                        0
                      </span>
                    </div>
                    <i className="text-gray-300 ri-arrow-down-s-line text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex flex-row w-7 h-7 justify-center items-center rounded-full relative overflow-visible transition-all duration-150 ease-in-out active:scale-95 border-transparent bg-gray-700 hover:bg-gray-600/80 hover:border-transparent"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <div className="absolute inset-0 w-full h-full border-white/10 border z-10 pointer-events-none rounded-full"></div>
                <img
                  alt="User"
                  draggable="false"
                  loading="eager"
                  decoding="async"
                  data-nimg="fill"
                  className="object-cover transition-all duration-150 brightness-100 hover:brightness-110"
                  src="data:image/svg+xml,%0A%20%20%20%20%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%20120%20120%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22grad-1824297318%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3Ahsl(198%2C%2073%25%2C%2048%25)%3Bstop-opacity%3A1%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3Ahsl(335%2C%2073%25%2C%2038%25)%3Bstop-opacity%3A1%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20fill%3D%22url(%23grad-1824297318)%22%20%2F%3E%0A%20%20%20%20%20%20%3Ctext%20%0A%20%20%20%20%20%20%20%20x%3D%2250%25%22%20%0A%20%20%20%20%20%20%20%20y%3D%2250%25%22%20%0A%20%20%20%20%20%20%20%20dominant-baseline%3D%22central%22%20%0A%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%20%0A%20%20%20%20%20%20%20%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20%0A%20%20%20%20%20%20%20%20font-size%3D%2248%22%20%0A%20%20%20%20%20%20%20%20font-weight%3D%22600%22%20%0A%20%20%20%20%20%20%20%20fill%3D%22white%22%0A%20%20%20%20%20%20%20%20opacity%3D%220.95%22%0A%20%20%20%20%20%20%3EEB%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    inset: '0px',
                    color: 'transparent',
                  }}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-gray-900 z-20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
              </div>
            </button>
            <div className="relative flex">
              <div data-state="closed" className="w-full">
                <button className="bg-gray-700 flex flex-row w-8 h-8 px-3 gap-2 justify-center items-center rounded-full hover:bg-gray-600/80">
                  <i className="text-gray-300 ri-user-settings-line text-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="flex sm:hidden flex-row w-full h-11  border-b border-gray-700 justify-between items-center px-2 gap-1">
        <button
          type="button"
          className="flex flex-row justify-center items-center h-6 w-6 active:scale-95 transition-transform"
        >
          <img
            alt="Axiom"
            loading="lazy"
            width="18"
            height="18"
            decoding="async"
            data-nimg="1"
            className="text-gray-300"
            style={{ color: 'white' }}
            src="/axiom-pulse.svg"
          />
        </button>
        <div className="flex-1 min-w-0"></div>
        <div className="flex flex-row gap-1 justify-end items-center relative">
          <button
            type="button"
            className="flex flex-row shrink-0 min-w-[70px] max-w-[180px] h-8 bg-gray-700 rounded-full justify-end items-center px-1.5 gap-0.5 active:scale-95 transition-transform hover:bg-gray-600/80"
          >
            <i className="ri-wallet-line text-gray-300 text-[13px] shrink-0"></i>
            <div className="flex flex-row gap-0.5 justify-center items-center min-w-0">
              <img
                alt="SOL"
                loading="lazy"
                width="11"
                height="11"
                decoding="async"
                data-nimg="1"
                src="/icons/solana-sol-logo.svg"
                style={{ color: 'transparent' }}
              />
              <span className="text-gray-300 text-xs font-semibold truncate">
                <span>0</span>
              </span>
            </div>
            <div className="w-px h-4 bg-gray-600 shrink-0"></div>
            <div className="flex flex-row gap-0.5 justify-center items-center min-w-0 shrink-0">
              <img
                alt="USDC"
                loading="lazy"
                width="11"
                height="14"
                decoding="async"
                data-nimg="1"
                src="/icons/usdc-perps.svg"
                style={{ color: 'transparent' }}
              />
              <span className="text-gray-300 text-xs font-semibold truncate">
                0
              </span>
            </div>
            <i className="ri-arrow-down-s-line text-gray-300 text-[13px] shrink-0 transition-transform"></i>
          </button>
          <div className="relative">
            <button
              type="button"
              className="flex flex-row h-8 px-2.5 gap-0.5 bg-gray-700 rounded-full justify-center items-center hover:bg-gray-600/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              aria-label="Paste Contract Address"
            >
              <i className="ri-file-copy-line text-gray-300 text-sm"></i>
              <span className="text-gray-300 text-[11px] font-medium">
                Paste CA
              </span>
            </button>
          </div>
          <button
            type="button"
            className="flex flex-row justify-center items-center h-8 w-8 bg-gray-700 rounded-full hover:bg-gray-600/80 transition-colors active:scale-95"
            aria-label="Search"
          >
            <i className="ri-search-2-line text-gray-300 text-sm"></i>
          </button>
          <button
            type="button"
            className="flex flex-row w-7 h-7 justify-center items-center rounded-full relative overflow-visible transition-all duration-150 ease-in-out active:scale-95 border-transparent bg-gray-700 hover:bg-gray-600/80 hover:border-transparent"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <div className="absolute inset-0 w-full h-full border-white/10 border z-10 pointer-events-none rounded-full"></div>
              <img
                alt="User"
                draggable="false"
                loading="eager"
                decoding="async"
                data-nimg="fill"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-150 brightness-100 hover:brightness-110 text-transparent"
                src="data:image/svg+xml,%0A%20%20%20%20%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%20120%20120%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%20%20%3Cdefs%3E%0A%20%20%20%20%20%20%20%20%3ClinearGradient%20id%3D%22grad-50183262%22%20x1%3D%220%25%22%20y1%3D%220%25%22%20x2%3D%22100%25%22%20y2%3D%22100%25%22%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20style%3D%22stop-color%3Ahsl(342%2C%2067%25%2C%2057%25)%3Bstop-opacity%3A1%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20style%3D%22stop-color%3Ahsl(119%2C%2067%25%2C%2047%25)%3Bstop-opacity%3A1%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%20%20%3C%2Fdefs%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%22120%22%20height%3D%22120%22%20fill%3D%22url(%23grad-50183262)%22%20%2F%3E%0A%20%20%20%20%20%20%3Ctext%20%0A%20%20%20%20%20%20%20%20x%3D%2250%25%22%20%0A%20%20%20%20%20%20%20%20y%3D%2250%25%22%20%0A%20%20%20%20%20%20%20%20dominant-baseline%3D%22central%22%20%0A%20%20%20%20%20%20%20%20text-anchor%3D%22middle%22%20%0A%20%20%20%20%20%20%20%20font-family%3D%22system-ui%2C%20-apple-system%2C%20sans-serif%22%20%0A%20%20%20%20%20%20%20%20font-size%3D%2248%22%20%0A%20%20%20%20%20%20%20%20font-weight%3D%22600%22%20%0A%20%20%20%20%20%20%20%20fill%3D%22white%22%0A%20%20%20%20%20%20%20%20opacity%3D%220.95%22%0A%20%20%20%20%20%20%3E3E%3C%2Ftext%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-gray-900 z-20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            </div>
          </button>
          <button
            type="button"
            className="flex flex-row justify-center items-center h-8 w-8 bg-gray-700 rounded-full hover:bg-gray-600/80 transition-colors active:scale-95"
          >
            <i className="ri-menu-line text-gray-300 text-lg"></i>
          </button>
        </div>
      </header>
    </>
  );
};
