const express = require('express');
const router = express.Router();
const { generateApiKey } = require('../utils/apiKeyUtil');

// POST /generate-key
// Body: { "email": "user@example.com", "expiresIn": 60 }
router.post('/', (req, res) => {
  const { email, expiresIn } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const apiKey = generateApiKey(email, expiresIn);
  res.json({ apiKey });
});

module.exports = router;
