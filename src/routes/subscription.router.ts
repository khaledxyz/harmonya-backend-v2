import { Router } from "express";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  validateSubscription,
} from "../controllers/Subscription";

const router = Router();

router.post("/", createSubscription);

router.post("/validate/:id", validateSubscription);

router.get("/", getAllSubscriptions);

router.get("/:id", getSubscriptionById);

router.put("/:id", updateSubscription);

router.delete("/:id", deleteSubscription);

export { router as subscriptionRouter };
