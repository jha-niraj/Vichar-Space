import { z } from "zod";

const signUpZodSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().min(3).max(20),
    password: z.string().min(8)
})
const signInZodSchema = z.object({
    email: z.string().email().min(3).max(20),
    password: z.string().min(8)
})

export {
    signUpZodSchema,
    signInZodSchema
}