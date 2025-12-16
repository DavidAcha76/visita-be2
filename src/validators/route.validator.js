import { z } from 'zod';

export const routeSchema = z.object({
  slug: z.string().min(1).max(200).toLowerCase().trim(),
  name: z.object({
    es: z.string().min(1).max(200),
    en: z.string().max(200).optional()
  }),
  description: z.object({
    es: z.string().min(1),
    en: z.string().optional()
  }),
  geometry: z.object({
    type: z.literal('LineString').default('LineString'),
    coordinates: z.array(z.tuple([
      z.number().min(-180).max(180),
      z.number().min(-90).max(90)
    ])).min(2)
  }),
  distanceKm: z.number().min(0),
  durationMin: z.number().min(0),
  difficulty: z.enum(['easy', 'moderate', 'hard']).optional(),
  transportMode: z.enum(['walking', 'cycling', 'driving', 'public_transport']).optional(),
  waypoints: z.array(z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    order: z.number().min(0)
  })).optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })).optional(),
  tags: z.array(z.string()).optional(),
  active: z.boolean().default(true)
});
