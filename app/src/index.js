const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || '1.0.0';

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Store for demo purposes (in production, use a database)
let items = [
  { id: 1, name: 'Learn Docker', completed: true },
  { id: 2, name: 'Learn Kubernetes', completed: false },
  { id: 3, name: 'Learn Terraform', completed: false },
  { id: 4, name: 'Setup CI/CD', completed: false }
];

// ==================== Health Check Endpoints ====================

// Liveness probe - Is the app running?
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: VERSION
  });
});

// Readiness probe - Is the app ready to serve traffic?
app.get('/ready', (req, res) => {
  // Add checks for database connections, external services, etc.
  res.status(200).json({
    status: 'ready',
    timestamp: new Date().toISOString()
  });
});

// ==================== API Endpoints ====================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to DevOps Demo API',
    version: VERSION,
    endpoints: {
      health: '/health',
      ready: '/ready',
      items: '/api/items',
      info: '/api/info'
    }
  });
});

// Get application info
app.get('/api/info', (req, res) => {
  res.json({
    app: 'DevOps Demo API',
    version: VERSION,
    environment: process.env.NODE_ENV || 'development',
    hostname: process.env.HOSTNAME || 'localhost',
    podName: process.env.POD_NAME || 'local',
    podNamespace: process.env.POD_NAMESPACE || 'default'
  });
});

// Get all items
app.get('/api/items', (req, res) => {
  res.json({
    count: items.length,
    items: items
  });
});

// Get item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// Create new item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name: name,
    completed: false
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const { name, completed } = req.body;
  items[itemIndex] = {
    ...items[itemIndex],
    ...(name !== undefined && { name }),
    ...(completed !== undefined && { completed })
  };
  
  res.json(items[itemIndex]);
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items.splice(itemIndex, 1);
  res.status(204).send();
});

// ==================== Error Handling ====================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ==================== Start Server ====================

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📍 API docs: http://localhost:${PORT}/`);
  });
}

module.exports = app;
