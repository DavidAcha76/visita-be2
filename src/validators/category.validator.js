import { z } from 'zod';

export const categorySchema = z.object({
  name: z.object({
    es: z.string().min(1).max(100),
    en: z.string().max(100).optional()
  }),
  description: z.object({
    es: z.string().optional(),
    en: z.string().optional()
  }),
  type: z.enum(['attraction', 'restaurant', 'food', 'hotel', 'poi', 'route']),
  icon: z.string().optional(),
  color: z.string().optional(),
  slug: z.string().min(1).max(100).toLowerCase().trim(),
  order: z.number().min(0).optional(),
  active: z.boolean().default(true)
});
