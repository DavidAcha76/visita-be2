import express from 'express';
import mongoose from 'mongoose';
import { successResponse } from '../lib/responseFormatter.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  res.status(dbConnected ? 200 : 503).json(successResponse({
    status: dbConnected ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbConnected ? 'connected' : 'disconnected',
    memory: process.memoryUsage()
  }));
});

export default router;
