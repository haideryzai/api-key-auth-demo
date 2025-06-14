require('dotenv').config();
const express = require('express');
const generateKeyRoute = require('./routes/generateKey');
const secureRoute = require('./routes/secureRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', generateKeyRoute);
app.use('/', secureRoute);

app.listen(PORT, () => {
  console.log(`API Key Auth Demo running at http://localhost:${PORT}`);
});
