import { Request, Response } from "express";
import db from "../services/prisma.service";
import pw from "../utils/password";
import { jwt } from "../utils/jwt";
import { CreateUserSchema } from "../schemas/users/create-user.schema";

const USER_TYPES = ['client', 'admin', 'owner', 'manager'] as const;
type UserType = typeof USER_TYPES[number];

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, ...userData } = req.body as CreateUserSchema['body'];

        if (await db.user.findFirst({ where: { email } })) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const userType = USER_TYPES.find(type => type in userData) as UserType;
        if (!userType) {
            res.status(400).json({ message: 'Invalid user type' });
            return;
        }

        const { password: _, ...user } = await db.user.create({
            data: {
                email,
                password: await pw.hash(password),
                firstName: userData.firstName,
                lastName: userData.lastName,
                [userType.charAt(0).toUpperCase() + userType.slice(1)]: {
                    create: userData[userType]
                }
            },
            include: {
                [userType.charAt(0).toUpperCase() + userType.slice(1)]: true
            }
        });

        res.status(201).json({
            message: 'success',
            user,
            token: jwt.sign({ id: user.id, email })
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};