import { Router, Request, Response } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getMe, login, passwordReset, passwordResetRequest, passwordResetVerify } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { requestPasswordResetSchema, resetPasswordSchema, verifyPasswordResetSchema } from "../schemas/auth/password-reset-schemas";
const router = Router();

router.post("/", login);
router.get('/', authenticate, getMe);

router.post('/password-reset/request', validate(requestPasswordResetSchema), passwordResetRequest);
router.post('/password-reset/verify', validate(verifyPasswordResetSchema), passwordResetVerify)
router.post('/password-reset', validate(resetPasswordSchema), passwordReset)

export { router as authRouter };