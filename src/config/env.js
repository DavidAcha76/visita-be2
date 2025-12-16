import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  MONGO_URI: z.string().url(),
  VAPID_PUBLIC_KEY: z.string().optional(),
  VAPID_PRIVATE_KEY: z.string().optional(),
  VAPID_SUBJECT: z.string().email().optional(),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('60000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('300'),
  CORS_ORIGIN: z.string().default('*')
});

let env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.error('❌ Error en variables de entorno:');
  console.error(error.errors);
  process.exit(1);
}

export default env;
