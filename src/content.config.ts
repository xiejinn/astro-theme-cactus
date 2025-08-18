import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseSchema = z.object({
	title: z.string().max(60),
});

const experience = defineCollection({
    loader: glob({ base: "./src/content/experience", pattern: "**/*.{md,mdx}" }),
    schema: baseSchema.extend({
        description: z.string().optional(),
        organization: z.string().optional(),
        startDate: z.string()
            .regex(/^[A-Z][a-z]+ \d{4}$/, "Must be in the format 'Month YYYY'"),
        endDate: z.union([
            z.string()
                .regex(/^[A-Z][a-z]+ \d{4}$/, "Must be in the format 'Month YYYY'"),
            z.literal("present")
        ]),
    })
})

const project = defineCollection({
	loader: glob({ base: "./src/content/project", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional(),
        language: z.string().optional(),
		publishDate: z
			.string()
			.datetime({ offset: true }) // Ensures ISO 8601 format with offsets allowed (e.g. "2024-01-01T00:00:00Z" and "2024-01-01T00:00:00+02:00")
			.transform((val) => new Date(val)),
	}),
});


export const collections = { experience, project };
