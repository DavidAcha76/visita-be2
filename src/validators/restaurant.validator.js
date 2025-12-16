import { z } from 'zod';

const coordinatesSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90)
]);

export const restaurantSchema = z.object({
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
    coordinates: coordinatesSchema
  }),
  address: z.string().min(1).max(300),
  phone: z.string().max(50).optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  priceLevel: z.number().min(1).max(4),
  cuisineTypes: z.array(z.string()).optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })).optional(),
  tags: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  active: z.boolean().default(true)
});
