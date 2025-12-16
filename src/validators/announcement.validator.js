import { z } from 'zod';

export const announcementSchema = z.object({
  slug: z.string().min(1).max(200).toLowerCase().trim(),
  name: z.object({
    es: z.string().min(1).max(200),
    en: z.string().max(200).optional()
  }),
  content: z.object({
    es: z.string().min(1),
    en: z.string().optional()
  }),
  category: z.enum(['event', 'news', 'alert', 'promotion']).default('news'),
  publishAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime(),
  pinned: z.boolean().optional(),
  priority: z.number().min(1).max(10).optional(),
  link: z.string().url().optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().default(false)
  })).optional(),
  active: z.boolean().default(true)
});
