/**
 * Token Data Schema
 *
 * Static fields (never change after creation):
 * - id, name, ticker, image_url, created_at, protocol, influence
 *
 * Dynamic fields (updated via WebSocket):
 * - metrics, distribution, security
 */

class TokenSchema {
  constructor(data) {
    // --- STATIC FIELDS (From initial snapshot only) ---
    this.id = data.id;
    this.name = data.name;
    this.ticker = data.ticker;
    this.image_url = data.image_url;
    this.created_at = data.created_at;
    this.protocol = data.protocol;
    this.influence = data.influence;
    this.room = data.room; // Fixed room assignment: 'new_pairs', 'final_stretch', or 'migrated'

    // --- DYNAMIC FIELDS (Updated via WebSocket) ---
    this.metrics = data.metrics || {};
    this.distribution = data.distribution || {};
    this.security = data.security || {};
  }

  /**
   * Get only the dynamic fields that change over time
   */
  getDynamicFields() {
    return {
      metrics: this.metrics,
      distribution: this.distribution,
      security: this.security,
    };
  }

  /**
   * Update dynamic fields with delta data
   */
  updateDynamicFields(delta) {
    if (delta.metrics) {
      this.metrics = { ...this.metrics, ...delta.metrics };
    }
    if (delta.distribution) {
      this.distribution = { ...this.distribution, ...delta.distribution };
    }
    if (delta.security) {
      this.security = { ...this.security, ...delta.security };
    }
  }

  /**
   * Get complete token data
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      ticker: this.ticker,
      image_url: this.image_url,
      created_at: this.created_at,
      protocol: this.protocol,
      influence: this.influence,
      room: this.room,
      metrics: this.metrics,
      distribution: this.distribution,
      security: this.security,
    };
  }
}

module.exports = TokenSchema;
