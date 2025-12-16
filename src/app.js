import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUi from 'swagger-ui-express';
import env from './config/env.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS - Solución mejorada
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = env.CORS_ORIGIN === '*' 
      ? '*' 
      : env.CORS_ORIGIN.split(',').map(o => o.trim());
    
    if (allowedOrigins === '*' || !origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(compression());

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(mongoSanitize());

app.use('/api', apiLimiter);

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Visita Cocha API',
    version: '1.0.0',
    description: 'API REST para plataforma turística de Cochabamba, Bolivia',
    contact: {
      name: 'API Support',
      email: 'soporte@visitacocha.com'
    }
  },
  servers: [
    {
      url: env.NODE_ENV === 'production' 
        ? 'https://api.visitacocha.com' 
        : `http://localhost:${env.PORT}`,
      description: env.NODE_ENV === 'production' ? 'Producción' : 'Desarrollo'
    }
  ]
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    name: 'Visita Cocha API',
    version: '1.0.0',
    status: 'running',
    docs: '/docs',
    health: '/api/health'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    ok: false,
    error: {
      message: 'Ruta no encontrada',
      code: 'NOT_FOUND'
    }
  });
});

app.use(errorHandler);

export default app;
