import { z } from 'zod';

const coordinatesSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90)
]);

export const hotelSchema = z.object({
  slug: z.string().min(1).max(200).toLowerCase().trim(),
  name: z.object({
    es: z.string().min(1).max(200),
    en: z.string().max(200).optional()
  }),
  description: z.object({
    es: z.string().min(1),
    en: z.string().optional()
  }),
  location: z.object({
    type: z.literal('Point').default('Point'),
    coordinates: coordinatesSchema
  }),
  address: z.string().min(1).max(300),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  stars: z.number().min(1).max(5),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
    currency: z.string().default('BOB')
  }),
  roomCount: z.number().min(1).optional(),
  amenities: z.array(z.string()).optional(),
  checkIn: z.string().default('14:00'),
  checkOut: z.string().default('12:00'),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })).optional(),
  tags: z.array(z.string()).optional(),
  active: z.boolean().default(true)
});
