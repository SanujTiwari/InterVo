import app from './src/app.js';
import env from './src/config/env.js';
import logger from './src/utils/logger.js';
import { testConnection } from './src/config/db.js';

const startServer = async () => {
  try {
    console.log('🔄 Connecting to database...');
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Database connection failed on startup. Exiting...');
      process.exit(1);
    }

    app.listen(env.port, () => {
      console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║   🚀  Intervo API Server                     ║
  ║                                              ║
  ║   Port:        ${String(env.port).padEnd(28)}║
  ║   Environment: ${env.nodeEnv.padEnd(28)}║
  ║   Health:      /api/v1/health                ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection', { error: err.message, stack: err.stack });
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', { error: err.message, stack: err.stack });
  process.exit(1);
});

startServer();
