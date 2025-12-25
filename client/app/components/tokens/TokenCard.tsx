'use client';

import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Twitter,
  Send,
  Search,
  TrendingUp,
  TrendingDown,
  Zap,
} from 'lucide-react';
import { TokenScore } from '@/store/tokenHistorySlice';

// Protocol configuration with icons and colors
interface ProtocolConfig {
  icon: string;
  color: string; // Text/icon color
  bgColor: string; // Background color
  borderColor: string; // Border color
}

const PROTOCOL_CONFIG: Record<string, ProtocolConfig> = {
  pump: {
    icon: '/protocols/pump.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  mayhem: {
    icon: '/protocols/mayhem.svg',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  bonk: {
    icon: '/protocols/bonk.svg',
    color: 'text-orange-300',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/30',
  },
  bags: {
    icon: '/protocols/bags.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  moonshot: {
    icon: '/protocols/moonshot-new.svg',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  },
  heaven: {
    icon: '/protocols/heaven.svg',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
  },
  daos_fun: {
    icon: '/protocols/daosfun.svg',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
  candle: {
    icon: '/protocols/candle.svg',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  sugar: {
    icon: '/protocols/sugar.svg',
    color: 'text-pink-300',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/30',
  },
  believe: {
    icon: '/protocols/launch-a-coin.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  jupiter_studio: {
    icon: '/protocols/jupstudio.svg',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
  },
  moonit: {
    icon: '/protocols/moonit.svg',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  boop: {
    icon: '/protocols/boop.svg',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
  },
  launchlab: {
    icon: '/protocols/launchlab.svg',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
  },
  dynamic_bc: {
    icon: '/protocols/virtual-curve.svg',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
  // Legacy support
  pump_v1: {
    icon: '/protocols/pump.svg',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
};

// Protocol badge component with icon and colored styling
const ProtocolIcon = ({
  protocolId,
  label,
}: {
  protocolId: string;
  label: string;
}) => {
  const config =
    PROTOCOL_CONFIG[protocolId] ||
    PROTOCOL_CONFIG[label.toLowerCase().replace(/[.\s]/g, '_')];

  if (config) {
    return (
      <div
        className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${config.bgColor} border ${config.borderColor}`}
        title={label}
      >
        <img
          src={config.icon}
          alt={label}
          className="w-3 h-3"
          onError={e => {
            // Hide image on error
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span className={`text-[9px] font-medium ${config.color}`}>
          {label}
        </span>
      </div>
    );
  }

  // Fallback to simple text badge if no config found
  return (
    <Badge
      variant="outline"
      className="text-[9px] px-1.5 py-0.5 h-auto border-gray-700 text-gray-500"
    >
      {label}
    </Badge>
  );
};

interface Token {
  id: string;
  name: string;
  ticker: string;
  image_url: string;
  created_at: string;
  protocol: {
    id: string;
    label: string;
  };
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
}

// Helper to format relative time
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

// Helper to format currency
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

  // Dynamic styling based on priority
  const cardClasses = `
    bg-[#111113] border transition-all cursor-pointer p-3

  `;

  // Score indicator component
  const ScoreIndicator = () => {
    if (!score) return null;

    const totalScore = score.score;
    const momentum = score.hasMomentumIncreasing && score.hasVolumeExpansion;

    return (
      <div className="flex items-center gap-1">
        {/* Rank badge for top 5 */}
        {isTopPriority && rank !== undefined && (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[9px] px-1 h-4">
            #{rank}
          </Badge>
        )}

        {/* Score badge */}
        <Badge
          variant="outline"
          className={`text-[9px] px-1 h-4 ${
            totalScore >= 5
              ? 'border-green-500/50 text-green-400'
              : totalScore <= 2
              ? 'border-red-500/50 text-red-400'
              : 'border-gray-600 text-gray-400'
          }`}
        >
          <Zap className="w-2 h-2 mr-0.5" />
          {totalScore}
        </Badge>

        {/* Momentum indicator */}
        {momentum ? (
          <TrendingUp className="w-3 h-3 text-green-400" />
        ) : score.hasSellPressure ? (
          <TrendingDown className="w-3 h-3 text-red-400" />
        ) : null}
      </div>
    );
  };

  return (
    <Card style={style} className={cardClasses}>
      <div className="flex gap-3">
        {/* Token Image */}
        <div className="relative flex-shrink-0">
          <img
            src={token.image_url}
            alt={token.name}
            className="w-14 h-14 rounded-lg object-cover bg-gray-800"
          />
          {/* Progress indicator dot */}
          <div
            className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full border-2 border-[#111113] ${
              token.metrics.bonding_progress > 50
                ? 'bg-green-500'
                : token.metrics.bonding_progress > 20
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
          />
          {/* Top priority glow indicator */}
          {isTopPriority && (
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          )}
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Name, Ticker, Protocol Icon */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white truncate">
              {token.name}
            </span>
            <span className="text-gray-500 text-sm truncate">
              {token.ticker}
            </span>
            <ProtocolIcon
              protocolId={token.protocol.id}
              label={token.protocol.label}
            />
            <ScoreIndicator />
          </div>

          {/* Row 2: Time + Social Icons */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span className="text-blue-400">{timeAgo}</span>
            <div className="flex items-center gap-1">
              {social_links.website && (
                <Globe className="w-3 h-3 hover:text-white cursor-pointer" />
              )}
              {social_links.twitter && (
                <Twitter className="w-3 h-3 hover:text-white cursor-pointer" />
              )}
              {social_links.telegram && (
                <Send className="w-3 h-3 hover:text-white cursor-pointer" />
              )}
              <Search className="w-3 h-3 hover:text-white cursor-pointer" />
            </div>
            <span>👥 {token.distribution.holders}</span>
            <span>🔄 {token.distribution.pro_traders}</span>
          </div>

          {/* Row 3: Contract Address (truncated) */}
          <div className="text-[10px] text-gray-600 truncate">
            {token.id.slice(0, 4)}...{token.id.slice(-4)}
          </div>
        </div>

        {/* Metrics (Right Side) */}
        <div className="flex-shrink-0 text-right">
          <div className="text-xs text-gray-500">
            MC{' '}
            <span
              className={
                token.metrics.price_change_dir === 'up'
                  ? 'text-green-400'
                  : 'text-red-400'
              }
            >
              {formatCurrency(token.metrics.market_cap)}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            V{' '}
            <span className="text-white">
              {formatCurrency(token.metrics.volume_24h)}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            F{' '}
            <span className="text-white">
              {token.metrics.price_sol.toFixed(3)}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            TX <span className="text-white">{token.metrics.transactions}</span>
            {/* Progress bar */}
            <div className="w-12 h-1 bg-gray-800 rounded-full mt-1 ml-auto">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                style={{
                  width: `${Math.min(token.metrics.bonding_progress, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-800 text-[10px]">
        <span className="text-red-400">
          👤 {token.distribution.dev_status.dev_hold_percent.toFixed(0)}%
        </span>
        <span className="text-yellow-400">
          📦 {token.distribution.bundle_holding.toFixed(0)}%
        </span>
        <span className="text-gray-500">
          🎯 {token.distribution.snipers_holding.toFixed(0)}%
        </span>
        <span className="text-gray-500">
          🔝 {token.security.top_10_holders_pct.toFixed(0)}%
        </span>
        <span className="text-gray-500">🔥 {token.security.lp_burned}%</span>
      </div>
    </Card>
  );
};

// Memoized TokenCard - only re-renders when token data or priority status changes
export const TokenCard = memo(TokenCardComponent, (prevProps, nextProps) => {
  const prev = prevProps.token;
  const next = nextProps.token;

  // Compare priority status first (quick check)
  if (
    prevProps.isTopPriority !== nextProps.isTopPriority ||
    prevProps.isDeprioritized !== nextProps.isDeprioritized ||
    prevProps.rank !== nextProps.rank
  ) {
    return false;
  }

  // Compare score
  if (prevProps.score?.score !== nextProps.score?.score) {
    return false;
  }

  // Compare the fields that actually change (metrics, distribution, security)
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
