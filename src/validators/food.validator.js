import { z } from 'zod';

export const foodSchema = z.object({
  slug: z.string().min(1).max(200).toLowerCase().trim(),
  name: z.object({
    es: z.string().min(1).max(200),
    en: z.string().max(200).optional()
  }),
  description: z.object({
    es: z.string().min(1),
    en: z.string().optional()
  }),
  category: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID inválido'),
  price: z.number().min(0),
  currency: z.string().default('BOB'),
  ingredients: z.array(z.string()).optional(),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  spicyLevel: z.number().min(0).max(5).optional(),
  allergens: z.array(z.string()).optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })).optional(),
  tags: z.array(z.string()).optional(),
  active: z.boolean().default(true)
});
