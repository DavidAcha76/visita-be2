import { z } from 'zod';

export const reviewSchema = z.object({
  resource: z.enum(['Attraction', 'Restaurant', 'Hotel', 'Route', 'POI']),
  resourceId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  rating: z.number().min(1).max(5),
  title: z.string().max(100).optional(),
  comment: z.string().min(1).max(1000),
  user: z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    avatar: z.string().url().optional()
  }),
  verified: z.boolean().default(false)
});
