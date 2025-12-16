import { z } from "zod";

export const i18nString = z.object({
  es: z.string().optional(),
  en: z.string().optional()
});

export const point2D = z.object({
  type: z.literal("Point").default("Point"),
  coordinates: z.tuple([z.number(), z.number()])
});
