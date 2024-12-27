import { z } from "zod";

export const createUserSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        client: z.object({
            address: z.string(),
            phone: z.string(),
            birthdate: z.string(),
        }).optional(),

        admin: z.object({}).optional(),

        owner: z.object({
            franchise: z.string(),
        }).optional(),

        manager: z.object({
            ownerId: z.string(),
        }).optional(),

    }).refine(data => data.client || data.admin || data.owner || data.manager, {
        message: "At least one user type (client, admin, owner, manager) must be provided",
        path: ["body"],
    }),
    query: z.object({
        type: z.union([z.literal('client'), z.literal('owner'), z.literal('manager')])
    })
})

export type CreateUserSchema = z.infer<typeof createUserSchema>;