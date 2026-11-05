import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { config } from './config/config.js';
import { errorHandler } from './middleware/errorHandler.js';

import templateRoutes from './routes/templateRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const allowedOrigins = config.corsOrigin === '*'
  ? '*'
  : config.corsOrigin.includes(',')
    ? config.corsOrigin.split(',').map(s => s.trim())
    : config.corsOrigin;

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Rate limiting for general API requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests, please try again later.'
  }
});
app.use('/api', limiter);

// Parse JSON bodies with support for large canvas exports (50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploaded assets
app.use('/uploads', express.static(config.paths.uploads));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Festive Ad Studio API',
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/templates', templateRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/projects', projectRoutes);

// 404 handler for unknown routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint '${req.originalUrl}' not found`
  });
});

// Centralized error handling
app.use(errorHandler);

export default app;
