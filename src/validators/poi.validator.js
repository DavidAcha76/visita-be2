import { z } from 'zod';

export const poiSchema = z.object({
  slug: z.string().min(1).max(200).toLowerCase().trim(),
  name: z.object({
    es: z.string().min(1).max(200),
    en: z.string().max(200).optional()
  }),
  description: z.object({
    es: z.string().min(1),
    en: z.string().optional()
  }),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de categoría inválido'),
  location: z.object({
    type: z.literal('Point').default('Point'),
    coordinates: z.tuple([
      z.number().min(-180).max(180),
      z.number().min(-90).max(90)
    ])
  }),
  type: z.enum(['museum', 'park', 'monument', 'viewpoint', 'historical', 'cultural', 'shopping', 'entertainment', 'other']),
  address: z.string().max(300).optional(),
  icon: z.string().optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })).optional(),
  tags: z.array(z.string()).optional(),
  active: z.boolean().default(true)
});
