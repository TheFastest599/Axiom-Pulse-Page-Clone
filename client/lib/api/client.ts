const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return response.json();
  },
};

// API endpoints
export const endpoints = {
  tokens: {
    snapshot: '/api/tokens/snapshot',
    byId: (id: string) => `/api/tokens/${id}`,
  },
  market: '/api/market',
  health: '/api/health',
};
