import { Router } from 'express';
import { testConnection } from '../config/db.js';
import { ApiResponse } from '../utils/apiResponse.js';

const router = Router();

/**
 * GET /api/v1/health
 * Health check endpoint — verifies server and database status.
 */
router.get('/', async (req, res) => {
  const dbConnected = await testConnection();

  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    database: dbConnected ? 'connected' : 'disconnected',
    version: '1.0.0',
  };

  if (!dbConnected) {
    return ApiResponse.error(res, {
      statusCode: 503,
      message: 'Service partially unavailable',
      error: healthData,
    });
  }

  return ApiResponse.success(res, {
    message: 'Intervo API is running',
    data: healthData,
  });
});

export default router;
