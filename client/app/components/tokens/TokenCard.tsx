'use client';

import { memo } from 'react';
import { Globe, Twitter, Send, Search } from 'lucide-react';
import { TokenScore } from '@/store/tokenHistorySlice';
import { BondingTooltip } from './BondingTooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { toast } from 'sonner';

// Protocol configuration with icons and colors
interface ProtocolConfig {
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const PROTOCOL_CONFIG: Record<string, ProtocolConfig> = {
  pump: {
    icon: '/protocols/pump.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500',
  },
  mayhem: {
    icon: '/protocols/mayhem.svg',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500',
  },
  bonk: {
    icon: '/protocols/bonk.svg',
    color: 'text-orange-300',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400',
  },
  bags: {
    icon: '/protocols/bags.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500',
  },
  moonshot: {
    icon: '/protocols/moonshot-new.svg',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500',
  },
  heaven: {
    icon: '/protocols/heaven.svg',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500',
  },
  daos_fun: {
    icon: '/protocols/daosfun.svg',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500',
  },
  candle: {
    icon: '/protocols/candle.svg',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500',
  },
  sugar: {
    icon: '/protocols/sugar.svg',
    color: 'text-pink-300',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400',
  },
  believe: {
    icon: '/protocols/launch-a-coin.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500',
  },
  jupiter_studio: {
    icon: '/protocols/jupstudio.svg',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500',
  },
  moonit: {
    icon: '/protocols/moonit.svg',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500',
  },
  boop: {
    icon: '/protocols/boop.svg',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500',
  },
  launchlab: {
    icon: '/protocols/launchlab.svg',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500',
  },
  dynamic_bc: {
    icon: '/protocols/virtual-curve.svg',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500',
  },
  pump_v1: {
    icon: '/protocols/pump.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500',
  },
};

interface Token {
  id: string;
  name: string;
  ticker: string;
  image_url: string;
  created_at: string;
  protocol: { id: string; label: string };
  influence: {
    kols_count: number;
    kol_allocation_pct: number;
    social_links: {
      website: string | null;
      twitter: string | null;
      telegram: string | null;
    };
  };
  metrics: {
    market_cap: number;
    volume_24h: number;
    price_sol: number;
    transactions: number;
    global_fees_paid: number;
    bonding_progress: number;
    price_change_dir: string;
  };
  distribution: {
    holders: number;
    pro_traders: number;
    dev_status: {
      is_migrated: boolean;
      dev_created_count: number;
      dev_hold_percent: number;
    };
    bundle_holding: number;
    snipers_holding: number;
    insiders_holding: number;
  };
  security: {
    lp_burned: number;
    is_honeypot: boolean;
    top_10_holders_pct: number;
  };
}

interface TokenCardProps {
  token: Token;
  score?: TokenScore | null;
  rank?: number;
  isTopPriority?: boolean;
  isDeprioritized?: boolean;
  style?: React.CSSProperties;
  isFirstCard?: boolean;
}

const formatRelativeTime = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffSec < 60) return `${diffSec}s`;
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHour < 24) return `${diffHour}h`;
  return `${diffDay}d`;
};

const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
};

const TokenCardComponent = ({
  token,
  score,
  rank,
  isTopPriority,
  isDeprioritized,
  style,
}: TokenCardProps) => {
  const timeAgo = formatRelativeTime(token.created_at);
  const { social_links } = token.influence;
  const bondingProgress = token.metrics.bonding_progress;
  const circumference = 296;
  const strokeDashoffset =
    circumference - (circumference * bondingProgress) / 100;
  const protocolConfig =
    PROTOCOL_CONFIG[token.protocol.id] ||
    PROTOCOL_CONFIG[token.protocol.label.toLowerCase().replace(/[.\s]/g, '_')];

  return (
    <BondingTooltip bondingProgress={bondingProgress}>
      <div
        className="w-full h-full flex flex-col  border border-gray-800 hover:border-gray-700 transition-all relative group"
        style={style}
      >
        {/* Top-left hidden buttons */}
        <button
          type="button"
          className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primaryBlue/80 w-6 h-6 flex items-center justify-center rounded bg-background border border-border/50 cursor-pointer"
          style={{ top: '6px', left: '6px' }}
          title="Hide Token"
        >
          <i className="ri-eye-off-line text-sm"></i>
        </button>
        <button
          type="button"
          className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity bg-background text-muted-foreground hover:text-primaryBlue/80 w-6 h-6 flex items-center justify-center rounded border border-border/50 cursor-pointer"
          style={{ top: '32px', left: '6px' }}
          title="Blacklist Dev"
        >
          <i className="ri-user-unfollow-line"></i>
        </button>
        {social_links.twitter && (
          <button
            type="button"
            className="absolute z-50 opacity-0 group-hover:opacity-100 transition-opacity bg-background text-muted-foreground hover:text-primaryBlue/80 w-6 h-6 flex items-center justify-center rounded border border-border/50 cursor-pointer"
            style={{ top: '58px', left: '6px' }}
            title="Blacklist Twitter Profile"
          >
            <i className="ri-twitter-line"></i>
          </button>
        )}

        {/* Mobile Quick Buy Button */}
        <div className="absolute right-3 bottom-2.5 sm:right-4 sm:bottom-3 z-20 block sm:hidden">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-400 text-[#090909] flex flex-row gap-1 justify-center items-center rounded-full h-6 px-1.5 whitespace-nowrap transition-all relative overflow-hidden"
          >
            <i className="ri-flashlight-fill text-base flex items-center relative z-10"></i>
            <span className="text-xs font-bold relative z-10">0 SOL</span>
          </button>
        </div>

        {/* Desktop Quick Buy Button */}
        <div className="absolute right-3 bottom-4 sm:right-4 sm:bottom-4 z-20 hidden sm:block lg:opacity-0 lg:group-hover:opacity-100 xl:opacity-100 2xl:!opacity-100">
          <div className="opacity-0 group-hover:opacity-100 2xl:!opacity-100">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-400 text-[#090909] flex flex-row gap-1 justify-center items-center rounded-full h-6 px-1.5 whitespace-nowrap transition-all relative overflow-hidden"
            >
              <i className="ri-flashlight-fill text-base flex items-center relative z-10"></i>
              <span className="text-xs font-bold relative z-10">0 SOL</span>
            </button>
          </div>
        </div>

        <div className="absolute right-4 top-4 z-10">
          <div className="flex flex-col gap-0.5 items-end">
            <div className="relative">
              <div
                className="absolute z-0"
                style={{ inset: '-12px -8px 1px -4px' }}
              >
                <div className="group-hover:bg-gray-800 absolute inset-0 z-10"></div>
                <div className=" absolute inset-0 z-0"></div>
              </div>
              <div className="relative flex flex-row gap-2 justify-end items-end z-20">
                <div
                  className="flex flex-row h-4.5 gap-1 justify-end items-end cursor-pointer"
                  title="Market Cap"
                >
                  <span
                    className="text-gray-500 text-xs font-medium pb-[0.1rem]"
                    title="Market Cap"
                  >
                    MC
                  </span>
                  <span
                    className={`text-base font-medium ${
                      token.metrics.price_change_dir === 'up'
                        ? 'text-green-400'
                        : 'text-cyan-400'
                    }`}
                  >
                    {formatCurrency(token.metrics.market_cap)}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div
                className="absolute z-0"
                style={{ inset: '-12px -8px 1px -4px' }}
              >
                <div className="group-hover:bg-gray-800 absolute inset-0 z-10"></div>
                <div className=" absolute inset-0 z-0"></div>
              </div>
              <div className="relative flex flex-row gap-2 justify-end items-end z-20">
                <div
                  className="flex flex-row h-4.5 gap-1 justify-end items-end cursor-pointer"
                  title="Volume"
                >
                  <span className="text-gray-500 text-xs font-medium pb-[0.1rem]">
                    V
                  </span>
                  <span className="text-base font-medium text-white">
                    {formatCurrency(token.metrics.volume_24h)}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative flex flex-row gap-2 items-start -mt-0.5">
              <div
                className="absolute z-0"
                style={{ inset: '-2px -8px -4px -4px' }}
              >
                <div className="group-hover:bg-gray-800 absolute inset-0 z-5 bg-[#0d0d0f]"></div>
                <div className=" absolute inset-0 z-0"></div>
              </div>
              <div
                className="relative flex flex-row justify-end items-center h-3 gap-1 z-20 cursor-pointer"
                title="Global Fees Paid"
              >
                <img
                  src="/icons/solana-sol-logo.svg"
                  alt={'solana'}
                  className="w-3 h-3"
                  onError={e =>
                    ((e.target as HTMLImageElement).style.display = 'none')
                  }
                />
                <span className="text-white text-xs font-medium">
                  {token.metrics.price_sol.toFixed(3)}
                </span>
              </div>
              <div className="relative flex flex-row justify-end items-center h-3 gap-1 z-20">
                <span
                  className="text-gray-500 text-[0.6875rem] font-medium"
                  title="Transactions"
                >
                  TX{' '}
                  <span className="text-white text-[0.6875rem] font-medium">
                    {token.metrics.transactions}
                  </span>
                </span>
                <div className="flex flex-row min-w-6 max-w-6 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-green-500"
                    style={{ width: '50%' }}
                  ></div>
                  <div
                    className="h-1 bg-red-500"
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full gap-3 pl-3 pr-3 py-2 justify-start items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="relative w-18.5 h-18.5 justify-center items-center">
              {protocolConfig && (
                <div
                  className={`flex absolute -bottom-2 -right-2 p-px w-4 h-4 justify-center items-center rounded-full z-30 border-2 cursor-pointer ${protocolConfig.borderColor}`}
                  title={token.protocol.label}
                >
                  <div className="flex justify-center items-center bg-[#0d0d0f]  absolute w-3 h-3 rounded-full z-30">
                    <img
                      alt={token.protocol.label}
                      width={10}
                      height={10}
                      src={protocolConfig.icon}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <HoverCard openDelay={10}>
                <HoverCardTrigger asChild>
                  <div className="absolute top-0 left-0 w-20 h-20 rounded z-10 flex items-center justify-center group/image cursor-pointer">
                    <svg width="78" height="78" viewBox="0 0 78 78">
                      <defs>
                        <clipPath id={`rounded-clip-${token.id}`}>
                          <rect
                            x="5"
                            y="5"
                            width="68"
                            height="68"
                            rx="2"
                            ry="2"
                          />
                        </clipPath>
                      </defs>
                      <path
                        className={
                          protocolConfig
                            ? protocolConfig.color
                            : 'text-gray-600'
                        }
                        style={{ opacity: 0.4 }}
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth="1"
                        d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"
                      />
                      <path
                        className={
                          protocolConfig
                            ? protocolConfig.color
                            : 'text-gray-400'
                        }
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                          transition: 'stroke-dashoffset 0.3s ease-in-out',
                        }}
                        d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"
                      />
                      {/* Image */}
                      <image
                        href={token.image_url}
                        x="5"
                        y="5"
                        width="68"
                        height="68"
                        clipPath={`url(#rounded-clip-${token.id})`}
                        onError={e =>
                          ((e.target as SVGImageElement).style.display = 'none')
                        }
                      />
                      {/* Camera icon overlay - clipped to same path */}
                      <g clipPath={`url(#rounded-clip-${token.id})`}>
                        <rect
                          x="5"
                          y="5"
                          width="68"
                          height="68"
                          fill="black"
                          fillOpacity="0"
                          className="group-hover/image:fill-opacity-60 transition-all"
                        />
                        <foreignObject x="5" y="5" width="68" height="68">
                          <div className="bg-black/60 w-full h-full flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity pointer-events-none">
                            <i className="ri-camera-line text-white text-2xl"></i>
                          </div>
                        </foreignObject>
                      </g>
                    </svg>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent
                  side="bottom"
                  align="start"
                  className="w-50 bg-secondary border-gray-800 p-1"
                >
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden ">
                    <img
                      src={token.image_url}
                      alt={token.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <span
              className="text-gray-500 text-xs font-medium text-center max-w-18.5"
              title={token.id}
            >
              {token.id.slice(0, 4)}...{token.id.slice(-4)}
            </span>
          </div>

          <div className="flex flex-col flex-1 h-full gap-5 justify-start items-start pt-0 pb-3 overflow-hidden">
            <div className="flex flex-col w-full gap-0.5 justify-start items-start min-w-0">
              <div className="flex flex-row min-h-4.5 w-full gap-1 justify-between items-start min-w-0">
                <div className="overflow-hidden">
                  <div className="flex flex-row gap-1 justify-start items-center">
                    <div className="min-w-0 whitespace-nowrap overflow-hidden truncate text-white text-base font-medium tracking-[-0.02em]">
                      {token.ticker}
                    </div>
                    <div
                      className="min-w-0 overflow-hidden text-gray-500 text-base hover:text-blue-400 cursor-pointer font-medium tracking-[-0.02em] truncate"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(token.name);
                          toast.info(`Copied Address to Clipboard`);
                        } catch (err) {
                          toast.error('Failed to copy to clipboard');
                        }
                      }}
                    >
                      {token.name} <i className="ri-file-copy-fill"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-row w-full h-4.5 gap-3 justify-start items-center">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      bondingProgress > 50 ? 'text-green-400' : 'text-gray-400'
                    }`}
                  >
                    {timeAgo}
                  </span>
                </div>
                {/* social links */}
                <div className="flex flex-row shrink-0 gap-2 justify-start items-center">
                  {social_links.website && (
                    <a
                      href={social_links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                      title="Website"
                    >
                      <Globe className="w-4 h-4 text-gray-400 hover:text-cyan-400 transition-colors" />
                    </a>
                  )}
                  {social_links.twitter && (
                    <a
                      href={social_links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4 text-gray-400 hover:text-cyan-400 transition-colors" />
                    </a>
                  )}
                  {social_links.telegram && (
                    <a
                      href={social_links.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                      title="Telegram"
                    >
                      <Send className="w-4 h-4 text-gray-400 hover:text-cyan-400 transition-colors" />
                    </a>
                  )}
                  <Search
                    className="w-4 h-4 text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    //   title="Search"
                  />
                </div>
                {/* distribution */}
                <div className="flex-row flex-1 h-4.5 gap-2 justify-start items-center hidden sm:flex md:hidden lg:hidden xl:flex">
                  <div
                    className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer"
                    title="Holders"
                  >
                    <i className="ri-group-line text-gray-400 text-base"></i>
                    <span className="text-xs font-medium text-white">
                      {token.distribution.holders}
                    </span>
                  </div>
                  <div
                    className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0 cursor-pointer"
                    title="Pro Traders"
                  >
                    <i className="ri-stock-line text-gray-400 text-base "></i>
                    <span className="text-white text-xs font-medium">
                      {token.distribution.pro_traders}
                    </span>
                  </div>
                  <div
                    className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0 cursor-pointer"
                    title="KOLs"
                  >
                    <i className="ri-trophy-line text-gray-400 text-base "></i>
                    <span className="text-white text-xs font-medium">
                      {token.influence.kols_count}
                    </span>
                  </div>
                  <div
                    className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer"
                    title="Top 10 Holders"
                  >
                    <i className="ri-vip-crown-2-line text-gray-400 text-base pb-[1.2px]"></i>
                    <span className="text-white text-xs font-medium">
                      0/{token.security.top_10_holders_pct.toFixed(0)}
                    </span>
                  </div>
                  <div className="inline-flex items-center justify-center gap-1 text-muted-foreground leading-none">
                    <i className="ri-eye-line text-base flex items-center"></i>
                    <span className="text-[11px] font-medium flex items-center">
                      2
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:hidden md:flex lg:flex xl:hidden flex-row flex-1 h-4.5 gap-2 justify-start items-center pt-4">
                <div
                  className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer"
                  title="Holders"
                >
                  <i className="ri-group-line text-gray-400 text-base"></i>
                  <span className="text-xs font-medium text-white">
                    {token.distribution.holders}
                  </span>
                </div>
                <div
                  className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0 cursor-pointer"
                  title="Pro Traders"
                >
                  <i className="ri-stock-line text-gray-400 text-base "></i>
                  <span className="text-white text-xs font-medium">
                    {token.distribution.pro_traders}
                  </span>
                </div>
                <div
                  className="flex flex-row gap-0.5 h-4 justify-center items-center shrink-0 cursor-pointer"
                  title="KOLs"
                >
                  <i className="ri-trophy-line text-gray-400 text-base "></i>
                  <span className="text-white text-xs font-medium">
                    {token.influence.kols_count}
                  </span>
                </div>
                <div
                  className="flex flex-row gap-0.5 h-4 justify-start items-center cursor-pointer"
                  title="Top 10 Holders"
                >
                  <i className="ri-vip-crown-2-line text-gray-400 text-base pb-[1.2px]"></i>
                  <span className="text-white text-xs font-medium">
                    0/{token.security.top_10_holders_pct.toFixed(0)}
                  </span>
                </div>
                <div className="inline-flex items-center justify-center gap-1 text-muted-foreground leading-none">
                  <i className="ri-eye-line text-[9px] sm:text-base flex items-center"></i>
                  <span className="text-[11px] sm:text-[11px] font-medium flex items-center">
                    2
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="hidden sm:flex md:hidden lg:hidden xl:flex flex-row w-full h-6 gap-1 justify-start items-end">
              <div
                className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
                title="Developer Holdings"
              >
                <i
                  className={`ri-user-star-line text-sm ${
                    token.distribution.dev_status.dev_hold_percent > 5
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                ></i>
                <span
                  className={`text-xs font-medium ${
                    token.distribution.dev_status.dev_hold_percent > 5
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                >
                  {token.distribution.dev_status.dev_hold_percent.toFixed(0)}%
                </span>
              </div>
              <div
                className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
                title="Bundle Holdings"
              >
                <i
                  className={`ri-archive-line text-sm ${
                    token.distribution.bundle_holding > 10
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                ></i>
                <span
                  className={`text-xs font-medium ${
                    token.distribution.bundle_holding > 10
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                >
                  {token.distribution.bundle_holding.toFixed(0)}%
                </span>
              </div>
              <div
                className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
                title="Sniper Holdings"
              >
                <i
                  className={`ri-crosshair-2-line text-sm ${
                    token.distribution.snipers_holding > 10
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                ></i>
                <span
                  className={`text-xs font-medium ${
                    token.distribution.snipers_holding > 10
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                >
                  {token.distribution.snipers_holding.toFixed(0)}%
                </span>
              </div>
              <div
                className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
                title="Top 10 Holders"
              >
                <i
                  className={`ri-vip-crown-2-line text-sm ${
                    token.security.top_10_holders_pct > 30
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                ></i>
                <span
                  className={`text-xs font-medium ${
                    token.security.top_10_holders_pct > 30
                      ? 'text-red-400'
                      : 'text-green-400'
                  }`}
                >
                  {token.security.top_10_holders_pct.toFixed(0)}%
                </span>
              </div>
              <div
                className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
                title="LP Burned"
              >
                <i
                  className={`ri-fire-line text-sm ${
                    token.security.lp_burned > 50
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                ></i>
                <span
                  className={`text-xs font-medium ${
                    token.security.lp_burned > 50
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {token.security.lp_burned}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Row */}
        <div className="flex sm:hidden md:flex lg:flex xl:hidden flex-row w-full h-6 gap-1 px-3 justify-start items-end">
          <div
            className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
            title="Developer Holdings"
          >
            <i
              className={`ri-user-star-line text-sm ${
                token.distribution.dev_status.dev_hold_percent > 5
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            ></i>
            <span
              className={`text-xs font-medium ${
                token.distribution.dev_status.dev_hold_percent > 5
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {token.distribution.dev_status.dev_hold_percent.toFixed(0)}%
            </span>
          </div>
          <div
            className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
            title="Bundle Holdings"
          >
            <i
              className={`ri-archive-line text-sm ${
                token.distribution.bundle_holding > 10
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            ></i>
            <span
              className={`text-xs font-medium ${
                token.distribution.bundle_holding > 10
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {token.distribution.bundle_holding.toFixed(0)}%
            </span>
          </div>
          <div
            className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
            title="Sniper Holdings"
          >
            <i
              className={`ri-crosshair-2-line text-sm ${
                token.distribution.snipers_holding > 10
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            ></i>
            <span
              className={`text-xs font-medium ${
                token.distribution.snipers_holding > 10
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {token.distribution.snipers_holding.toFixed(0)}%
            </span>
          </div>
          <div
            className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
            title="Top 10 Holders"
          >
            <i
              className={`ri-vip-crown-2-line text-sm ${
                token.security.top_10_holders_pct > 30
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            ></i>
            <span
              className={`text-xs font-medium ${
                token.security.top_10_holders_pct > 30
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {token.security.top_10_holders_pct.toFixed(0)}%
            </span>
          </div>
          <div
            className="flex flex-row gap-1 shrink-0 h-6 px-1.25 justify-start items-center rounded-full bg-[#111113] border-gray-700/50 border cursor-pointer"
            title="LP Burned"
          >
            <i
              className={`ri-fire-line text-sm ${
                token.security.lp_burned > 50
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            ></i>
            <span
              className={`text-xs font-medium ${
                token.security.lp_burned > 50
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {token.security.lp_burned}%
            </span>
          </div>
        </div>

        <div className="absolute right-3 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* This div is now empty - buttons moved to top of component */}
        </div>
      </div>
    </BondingTooltip>
  );
};

export const TokenCard = memo(TokenCardComponent, (prevProps, nextProps) => {
  const prev = prevProps.token;
  const next = nextProps.token;
  if (
    prevProps.isTopPriority !== nextProps.isTopPriority ||
    prevProps.isDeprioritized !== nextProps.isDeprioritized ||
    prevProps.rank !== nextProps.rank
  )
    return false;
  if (prevProps.score?.score !== nextProps.score?.score) return false;
  return (
    prev.id === next.id &&
    prev.metrics.market_cap === next.metrics.market_cap &&
    prev.metrics.volume_24h === next.metrics.volume_24h &&
    prev.metrics.price_sol === next.metrics.price_sol &&
    prev.metrics.transactions === next.metrics.transactions &&
    prev.metrics.bonding_progress === next.metrics.bonding_progress &&
    prev.metrics.price_change_dir === next.metrics.price_change_dir &&
    prev.distribution.holders === next.distribution.holders &&
    prev.distribution.pro_traders === next.distribution.pro_traders &&
    prev.distribution.dev_status.dev_hold_percent ===
      next.distribution.dev_status.dev_hold_percent &&
    prev.distribution.bundle_holding === next.distribution.bundle_holding &&
    prev.distribution.snipers_holding === next.distribution.snipers_holding &&
    prev.security.top_10_holders_pct === next.security.top_10_holders_pct &&
    prev.security.lp_burned === next.security.lp_burned
  );
});
