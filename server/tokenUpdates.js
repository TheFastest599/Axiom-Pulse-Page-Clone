/**
 * Token Updates Module
 * Handles real-time token delta updates in a modular way
 */

const { generateDeltaUpdate } = require('./mockData');

/**
 * Token Update Manager Class
 * Manages the logic for updating tokens and broadcasting changes
 */
class TokenUpdateManager {
  constructor(tokens, wss) {
    this.tokens = tokens;
    this.wss = wss;
    this.tokenClients = new Set(); // Clients in tokens room
    this.updateInterval = null;
    this.isRunning = false;
  }

  /**
   * Start the token update cycle
   * @param {number} intervalMs - Update interval in milliseconds
   */
  start(intervalMs = 2000) {
    if (this.isRunning) {
      console.log('⚠️  Token updates already running');
      return;
    }

    this.isRunning = true;
    this.updateInterval = setInterval(() => {
      this.broadcastSingleTokenUpdate();
    }, intervalMs);

    console.log(`🚀 Token updates started (1 token every ${intervalMs}ms)`);
  }

  /**
   * Add a client to the tokens room
   */
  addClient(ws) {
    this.tokenClients.add(ws);
  }

  /**
   * Remove a client from the tokens room
   */
  removeClient(ws) {
    this.tokenClients.delete(ws);
  }

  /**
   * Get the room/category for a token based on its stored room assignment
   * @param {TokenSchema} token - The token to categorize
   * @returns {string} - The room name: 'new_pairs', 'final_stretch', or 'migrated'
   */
  getTokenRoom(token) {
    // Use the stored room assignment (fixed at token creation)
    if (token.room) {
      return token.room;
    }

    // Fallback for legacy tokens without room field
    const bondingProgress = token.metrics.bonding_progress;
    const isMigrated = token.distribution.dev_status.is_migrated;

    // If explicitly migrated, put in migrated room
    if (isMigrated) {
      return 'migrated';
    }

    // Otherwise categorize by bonding progress
    if (bondingProgress >= 90) {
      return 'final_stretch'; // Close to migration
    } else {
      return 'new_pairs'; // Newly launched or early stage
    }
  }

  /**
   * Broadcast a single token update
   * Updates only 1 random token at a time
   * Now includes room categorization
   */
  broadcastSingleTokenUpdate() {
    const clientCount = this.tokenClients.size;
    if (clientCount === 0) {
      return; // No clients connected
    }

    // Select a random token
    const randomIndex = Math.floor(Math.random() * this.tokens.length);
    const token = this.tokens[randomIndex];

    // Capture the OLD room BEFORE generating delta
    const oldRoom = this.getTokenRoom(token);

    // Generate delta update for this token
    const delta = generateDeltaUpdate(token);

    if (!delta) {
      return; // No changes to broadcast
    }

    // Update the token in memory
    token.updateDynamicFields(delta);

    // Determine the NEW room after update (in case of transition)
    const newRoom = this.getTokenRoom(token);

    // If room changed, the delta already contains delta.room
    // Use oldRoom for the message.room so client knows where to find the token
    const messageRoom = delta.room ? oldRoom : newRoom;

    // Broadcast to all connected clients in the tokens room
    const messageStr = JSON.stringify({
      type: 'token_update',
      room: messageRoom, // Old room (where token currently is on client)
      timestamp: new Date().toISOString(),
      content: {
        id: token.id,
        delta: delta, // Contains delta.room if transitioning
      },
    });
    this.tokenClients.forEach(ws => {
      if (ws.readyState === ws.OPEN) {
        ws.send(messageStr);
      }
    });

    if (clientCount > 0) {
      if (process.env.DEV === 'true') {
        const roomInfo = delta.room
          ? `${messageRoom} → ${delta.room}`
          : newRoom;
        console.log(
          `📡 [${roomInfo}] Broadcasted 1 token update: ${token.name} (${token.ticker}) to ${clientCount} clients`
        );
      }
    }
  }

  /**
   * Manually trigger a single token update
   * Useful for testing or forced updates
   */
  triggerUpdate() {
    this.broadcastSingleTokenUpdate();
  }

  /**
   * Get current status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      connectedClients: this.tokenClients.size,
      totalTokens: this.tokens.length,
    };
  }
}

module.exports = TokenUpdateManager;
