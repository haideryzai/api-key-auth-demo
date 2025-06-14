const crypto = require('crypto');

// Generate an API key with embedded email and expiry (signed)
function generateApiKey(email, expiresInMinutes = 60) {
  const payload = {
    email,
    expiresAt: Date.now() + expiresInMinutes * 60 * 1000,
  };

  const payloadString = JSON.stringify(payload);
  const encodedPayload = Buffer.from(payloadString).toString('base64');

  // Sign the payload using HMAC and secret
  const signature = crypto
    .createHmac('sha256', process.env.API_SECRET)
    .update(encodedPayload)
    .digest('hex');

  // Final API key format: base64.payload.signature
  return `${encodedPayload}.${signature}`;
}

// Validate the API key
function verifyApiKey(apiKey) {
  const [encodedPayload, signature] = apiKey.split('.');
  if (!encodedPayload || !signature) return { valid: false, reason: 'Malformed API key' };

  const expectedSignature = crypto
    .createHmac('sha256', process.env.API_SECRET)
    .update(encodedPayload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return { valid: false, reason: 'Invalid signature' };
  }

  const decoded = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
  if (Date.now() > decoded.expiresAt) {
    return { valid: false, reason: 'API key expired' };
  }

  return { valid: true, payload: decoded };
}

module.exports = {
  generateApiKey,
  verifyApiKey,
};
