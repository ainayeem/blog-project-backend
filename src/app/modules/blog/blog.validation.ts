import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    author: z.string().optional(),
    isPublished: z.boolean().optional(),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ invalid_type_error: "Title must be a string" }).optional(),
    content: z.string({ invalid_type_error: "Content must be a string" }).optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
