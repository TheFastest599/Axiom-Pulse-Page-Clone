/**
 * Market Updates Module
 * Handles real-time market data updates in a modular way
 */

/**
 * Market Update Manager Class
 * Manages the logic for updating market data and broadcasting changes
 */
class MarketUpdateManager {
  constructor(marketData, io) {
    this.marketData = marketData;
    this.io = io;
    this.updateInterval = null;
    this.isRunning = false;
  }

  /**
   * Start the market update cycle
   * @param {number} intervalMs - Update interval in milliseconds
   */
  start(intervalMs = 1000) {
    if (this.isRunning) {
      console.log('⚠️  Market updates already running');
      return;
    }

    this.isRunning = true;
    this.updateInterval = setInterval(() => {
      this.broadcastMarketUpdate();
    }, intervalMs);

    console.log(`🚀 Market updates started (every ${intervalMs}ms)`);
  }

  /**
   * Stop the market update cycle
   */
  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      this.isRunning = false;
      console.log('⏹️  Market updates stopped');
    }
  }

  /**
   * Broadcast market data update
   * Updates all market data (BTC/ETH/SOL) at once
   */
  broadcastMarketUpdate() {
    const clientCount = this.io.sockets.adapter.rooms.get('market')?.size || 0;
    if (clientCount === 0) {
      return; // No clients connected
    }

    // Update market data with random changes
    Object.keys(this.marketData).forEach(coin => {
      const priceChange = (Math.random() - 0.5) * 0.02; // ±1% change
      this.marketData[coin].price = parseFloat(
        (this.marketData[coin].price * (1 + priceChange)).toFixed(2)
      );
      this.marketData[coin].change_24h = parseFloat(
        (
          this.marketData[coin].change_24h +
          (Math.random() - 0.5) * 0.5
        ).toFixed(2)
      );
    });

    // Prepare the update message
    const message = {
      timestamp: new Date().toISOString(),
      data: this.marketData,
    };

    // Broadcast to all connected clients in the market room
    this.io.to('market').emit('market_update', message);

    if (clientCount > 0) {
      console.log(
        `📊 Broadcasted market data update to ${clientCount} clients`
      );
    }
  }

  /**
   * Manually trigger a market update
   * Useful for testing or forced updates
   */
  triggerUpdate() {
    this.broadcastMarketUpdate();
  }

  /**
   * Get current status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      connectedClients: this.io.sockets.adapter.rooms.get('market')?.size || 0,
      marketCoins: Object.keys(this.marketData).length,
    };
  }
}

module.exports = MarketUpdateManager;
