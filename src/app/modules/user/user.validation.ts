import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(["admin", "user"]).optional(),
    isBlocked: z.boolean().optional(),
  }),
});
