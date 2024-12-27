import { ZodSchema, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction): void => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                message: 'Validation error',
                errors: error.errors,
            });
        } else {
            next(error);
        }
    }
};
