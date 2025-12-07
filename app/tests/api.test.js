const request = require('supertest');
const app = require('../src/index');

describe('API Endpoints', () => {
  
  describe('Health Checks', () => {
    test('GET /health should return healthy status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
    });

    test('GET /ready should return ready status', async () => {
      const response = await request(app).get('/ready');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ready');
    });
  });

  describe('Root Endpoint', () => {
    test('GET / should return welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Welcome to DevOps Demo API');
    });
  });

  describe('Items API', () => {
    test('GET /api/items should return list of items', async () => {
      const response = await request(app).get('/api/items');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('items');
      expect(Array.isArray(response.body.items)).toBe(true);
    });

    test('POST /api/items should create a new item', async () => {
      const newItem = { name: 'Test Item' };
      const response = await request(app)
        .post('/api/items')
        .send(newItem);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Item');
      expect(response.body.completed).toBe(false);
    });

    test('POST /api/items without name should return 400', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({});
      expect(response.status).toBe(400);
    });

    test('GET /api/items/:id should return specific item', async () => {
      const response = await request(app).get('/api/items/1');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
    });

    test('GET /api/items/:id with invalid id should return 404', async () => {
      const response = await request(app).get('/api/items/9999');
      expect(response.status).toBe(404);
    });
  });

  describe('Info Endpoint', () => {
    test('GET /api/info should return app info', async () => {
      const response = await request(app).get('/api/info');
      expect(response.status).toBe(200);
      expect(response.body.app).toBe('DevOps Demo API');
    });
  });

  describe('404 Handler', () => {
    test('GET /nonexistent should return 404', async () => {
      const response = await request(app).get('/nonexistent');
      expect(response.status).toBe(404);
    });
  });
});
