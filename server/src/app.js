import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.js';
import routes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const app = express();

// ─── Security Middleware ───────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: env.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Request Parsing ───────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ───────────────────────────────────────────────────
if (env.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Rate Limiting ─────────────────────────────────────────────
app.use('/api/', apiLimiter);

// ─── API Routes ────────────────────────────────────────────────
app.use('/api/v1', routes);

// ─── Root Route ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Intervo API',
    version: '1.0.0',
    docs: '/api/v1/health',
  });
});

// ─── Error Handling ────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
