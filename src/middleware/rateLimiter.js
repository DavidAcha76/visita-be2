import rateLimit from 'express-rate-limit';
import env from '../config/env.js';

export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    ok: false,
    error: {
      message: 'Demasiadas solicitudes, intenta más tarde',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});
