import z from "zod";

export const UserProfileSchema = z.object({
  name: z.string().trim().min(3).max(8),

  username: z
    .string()
    .trim()
    .min(6)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/),

  bio: z.string().max(200).optional(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
