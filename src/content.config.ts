import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().max(200),
    tags: z.array(z.enum(['ai-tools', 'strategy', 'startup', 'data', 'earlier-work'])),
    stack: z.array(z.string()).default([]),
    status: z.enum(['shipped', 'in-progress', 'experiment']).default('shipped'),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCaption: z.string().optional(),
    links: z
      .object({
        repo: z.string().optional(),
        live: z.string().optional(),
      })
      .default({}),
  }),
});

export const collections = { work };
