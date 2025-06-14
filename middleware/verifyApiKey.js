const { verifyApiKey } = require('../utils/apiKeyUtil');

const verifyApiKeyMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' });
  }

  const result = verifyApiKey(apiKey);

  if (!result.valid) {
    return res.status(403).json({ error: result.reason });
  }

  // Attach user info to request
  req.apiUser = result.payload;
  next();
};

module.exports = verifyApiKeyMiddleware;
