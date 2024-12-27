import { Router, Request, Response } from "express";
import { create } from "../controllers/users.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema } from "../schemas/users/create-user.schema";
const router = Router();

router.post("/", validate(createUserSchema), create);

export { router as usersRouter };
