import { z } from "zod";

export const signUpZodSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().min(3).max(20),
    password: z.string().min(8)
})
export const signInZodSchema = z.object({
    email: z.string().email().min(3).max(20),
    password: z.string().min(8)
})

export const createrBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.number()
})

export type SignUpInput = z.infer<typeof signUpZodSchema>
export type SignInInput = z.infer<typeof signInZodSchema>
export type CreateBlog = z.infer<typeof createrBlogInput>
export type UpdateBlog = z.infer<typeof updateBlogInput>