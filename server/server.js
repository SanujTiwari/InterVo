import app from './src/app.js';
import env from './src/config/env.js';
import logger from './src/utils/logger.js';
import { testConnection } from './src/config/db.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startServer = async () => {
  try {
    console.log('🔄 Connecting to database...');

    // Retry connection up to 3 times with a 3-second delay
    const MAX_RETRIES = 3;
    let dbConnected = false;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      dbConnected = await testConnection();
      if (dbConnected) break;

      if (attempt < MAX_RETRIES) {
        console.log(`⏳ Retrying database connection (${attempt}/${MAX_RETRIES})...`);
        await sleep(3000);
      }
    }

    if (!dbConnected) {
      console.error('❌ Database connection failed after retries. Exiting...');
      process.exit(1);
    }

    console.log('✅ Database connected successfully.');

    app.listen(env.port, () => {
      console.log('🚀 Intervo API Server started successfully.');
      console.log(`📡 Server running on port ${env.port}`);
      console.log(`🌍 Environment: ${env.nodeEnv}`);
      console.log(`❤️ Health Check: http://localhost:${env.port}/api/v1/health`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

startServer();