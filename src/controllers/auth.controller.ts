import { Request, Response } from "express";
import db from "../services/prisma.service";
import { jwt } from "../utils/jwt";
import pw from "../utils/password";
import { User } from "@prisma/client";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ message: 'Bad request' });
            return;
        }

        const user = await db.user.findFirst({ where: { email } });
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const passwordMatch = await pw.compare(password, user.password_hash);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const token = jwt.sign({ id: user.id, email: user.email });
        res.status(200).json({ message: 'success', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return
    }
}

export const getMe = async (req: Request, res: Response) => {
    res.json({
        message: 'logged in',
        user: req.user
    })
}

export const passwordResetRequest = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await db.user.findFirst({ where: { email } });

        if (user) {
            const token = jwt.sign({ id: user.id }, '5min');
            console.log('### RESET PASSWORD TOKEN ###', token);
            // TODO: send email with token
        }

        // always return success to prevent user enumeration
        res.json({ message: 'success' });
    } catch (error) {

    }
}

export const passwordResetVerify = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        jwt.verify(token);
        res.json({ message: 'valid token' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid token' });
    }
}

export const passwordReset = async (req: Request, res: Response) => {
    const { token, password } = req.body;

    try {
        const { id } = (jwt.verify(token) as User);
        const password_hash = await pw.hash(password);

        await db.user.update({
            where: { id },
            data: { password_hash }
        });

        res.json({ message: 'Password updated' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid token' });
    }
}