import { apiClient, endpoints } from './client';

export interface TokensSnapshotResponse {
  success: boolean;
  timestamp: string;
  totalCount: number;
  rooms: {
    new_pairs: {
      count: number;
      tokens: {
        [id: string]: any;
      };
    };
    final_stretch: {
      count: number;
      tokens: {
        [id: string]: any;
      };
    };
    migrated: {
      count: number;
      tokens: {
        [id: string]: any;
      };
    };
  };
}

export interface MarketDataResponse {
  success: boolean;
  data: {
    btc: {
      price: number;
      change_24h: number;
      volume_24h: number;
    };
    eth: {
      price: number;
      change_24h: number;
      volume_24h: number;
    };
    sol: {
      price: number;
      change_24h: number;
      volume_24h: number;
    };
  };
}

export const fetchTokensSnapshot =
  async (): Promise<TokensSnapshotResponse> => {
    return apiClient.get(endpoints.tokens.snapshot);
  };

export const fetchMarketData = async (): Promise<MarketDataResponse> => {
  return apiClient.get(endpoints.market);
};

export const fetchTokenById = async (id: string) => {
  return apiClient.get(endpoints.tokens.byId(id));
};

export const fetchHealth = async () => {
  return apiClient.get(endpoints.health);
};
