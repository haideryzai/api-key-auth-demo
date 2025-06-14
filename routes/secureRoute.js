const express = require('express');
const router = express.Router();
const verifyApiKey = require('../middleware/verifyApiKey');

// GET /secure-data
router.get('/secure-data', verifyApiKey, (req, res) => {
  res.json({
    message: 'Secure data accessed.',
    user: req.apiUser.email,
    expiresAt: new Date(req.apiUser.expiresAt).toISOString(),
  });
});

module.exports = router;
