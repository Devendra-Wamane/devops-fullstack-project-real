
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const APP_NAME = process.env.APP_NAME || 'devops-fullstack-backend';
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', app: APP_NAME, env: NODE_ENV });
});

app.get('/', (req, res) => {
  res.json({ message: `Welcome to the backend API!`, app: APP_NAME });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!', app: APP_NAME });
});

if (NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`${APP_NAME} listening on port ${PORT}`);
  });
}

module.exports = app;
