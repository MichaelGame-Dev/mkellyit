import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
    // Type-check frontmatter using a schema
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
            tags: z.array(z.string()).optional(),
        }),
});

const consulting = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/consulting",
    }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        year_completed: z.number().int(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()).optional(),
        service: z.string(), // e.g., "Game Development", "Technical Consulting"
        icon: z.string().optional(),
        featured: z.boolean().default(false),
    }),
});
export const collections = { blog, consulting };
