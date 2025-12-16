import { z } from 'zod';

const coordinatesSchema = z.tuple([
  z.number().min(-180).max(180), // longitude
  z.number().min(-90).max(90)     // latitude
]);

export const attractionSchema = z.object({
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
  address: z.string().max(300).optional(),
  phone: z.string().max(50).optional(),
  website: z.string().url().optional(),
  email: z.string().email().optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })).optional(),
  tags: z.array(z.string()).optional(),
  admission: z.object({
    price: z.number().min(0).default(0),
    currency: z.string().default('BOB'),
    isFree: z.boolean().default(false)
  }).optional(),
  amenities: z.array(z.string()).optional(),
  active: z.boolean().default(true)
});
