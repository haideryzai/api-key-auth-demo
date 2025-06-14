require('dotenv').config();
const express = require('express');
const generateKeyRoute = require('./routes/generateKey');
const secureRoute = require('./routes/secureRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Key Auth Demo - Use /generate-key to create an API key and /secure-data to access secure data.');
});

app.use('/generate-key', generateKeyRoute);
app.use('/secure-data', secureRoute);

app.listen(PORT, () => {
  console.log(`API Key Auth Demo running at http://localhost:${PORT}`);
});
