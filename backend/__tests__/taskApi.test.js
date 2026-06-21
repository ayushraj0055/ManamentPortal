const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/taskRoutes');

// Mock Auth Middleware
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {
    req.user = { id: 'testUserId' };
    next();
  }
}));

// Mock Task Controller functions
jest.mock('../controllers/taskController', () => ({
  getTasks: (req, res) => res.status(200).json({ success: true, data: [] }),
  createTask: (req, res) => res.status(201).json({ success: true, data: { title: req.body.title } }),
  updateTask: (req, res) => res.status(200).json({ success: true }),
  deleteTask: (req, res) => res.status(200).json({ success: true }),
  getTaskStats: (req, res) => res.status(200).json({ success: true, data: {} })
}));

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

describe('Task API Routes', () => {
  it('GET /api/tasks - should return 200', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBeTruthy();
  });

  it('POST /api/tasks - should create a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Test Description 1234567890' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.data.title).toEqual('Test Task');
  });
});
