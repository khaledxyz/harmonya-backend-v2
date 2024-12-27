import { z } from "zod";

export const requestPasswordResetSchema = z.object({
    body: z.object({
        email: z.string().email(),
    })
});

export const verifyPasswordResetSchema = z.object({
    body: z.object({
        token: z.string(),
    })
});

export const resetPasswordSchema = z.object({
    body: z.object({
        token: z.string(),
        password: z.string().min(8),
    })
});