import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    metaDescription: z.string(),
    lang: z.enum(['en', 'es']),
    // Slug shared between the EN and ES version of the same article,
    // used to link the language toggle to the correct translation.
    translationKey: z.string(),
    category: z.string(), // e.g. "medical-debt", "scams" — used for related-content linking
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    reviewedBy: z.string().default('Daniel Rodriguez'),
    readTime: z.string(), // e.g. "8 min read"
    sources: z.array(z.string()), // short source names shown in the meta bar
    relatedCategorySlug: z.string().optional(), // links article to a directory category
    whatChanged: z
      .object({
        previous: z.string(),
        current: z.string(),
      })
      .optional(),
  }),
});

const listings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/listings' }),
  schema: z.object({
    name: z.string(),
    category: z.enum([
      'nonprofit-credit-counseling',
      'bankruptcy-attorneys',
      'legal-aid',
      'credit-unions',
      'housing-counselors',
    ]),
    featured: z.boolean().default(false),
    languages: z.array(z.string()),
    serviceArea: z.string(),
    cost: z.string(),
    format: z.string(),
    website: z.string().url().optional(),
    phone: z.string().optional(),
    // Verification record fields
    verifiedDate: z.coerce.date(),
    nextReviewDate: z.coerce.date(),
    sourcesChecked: z.array(z.string()),
    confirmed: z.array(z.string()),
    notIndependentlyVerified: z.array(z.string()).default([]),
  }),
});

export const collections = { articles, listings };
