/**
 * One-time script to generate tokens and save to tokens.json
 * This ensures consistent token IDs across server restarts
 */

const { generateInitialTokens } = require('./mockData');
const fs = require('fs');
const path = require('path');

console.log('🎯 Generating 25 tokens with fixed IDs...\n');

// Generate tokens
const tokens = generateInitialTokens(30);

// Convert to plain objects for JSON serialization
const tokenData = tokens.map(token => token.toJSON());

// Save to tokens.json
const filePath = path.join(__dirname, 'tokens.json');
fs.writeFileSync(filePath, JSON.stringify(tokenData, null, 2));

console.log(`✅ Generated ${tokens.length} tokens`);
console.log(`📁 Saved to: ${filePath}`);
console.log('\n📊 Token IDs:');
tokenData.forEach((token, index) => {
  console.log(`${index + 1}. ${token.name} (${token.ticker}) - ${token.id}`);
});

console.log(
  '\n🎉 Done! Server will now load from tokens.json instead of generating new tokens each time.'
);
