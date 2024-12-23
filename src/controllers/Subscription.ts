import { SubscriptionType } from "@prisma/client";
import prisma from "../config/db";
import { Request, Response } from "express";
import { addDays } from "date-fns";

// Create Subscription
export const createSubscription = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      ownerEmail,
      type,
    }: {
      ownerEmail: string;
      type: SubscriptionType;
    } = req.body;

    const subscription = await prisma.subscription.create({
      data: {
        ownerEmail,
        type,
        requestDate: new Date(),
      },
    });

    return res.status(201).json(subscription);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to create subscription");
  }
};

// Read All Subscriptions
export const getAllSubscriptions = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const subscriptions = await prisma.subscription.findMany();
    return res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to fetch subscriptions");
  }
};

export const validateSubscription = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const subscription = await prisma.subscription.update({
      where: {
        id: req.params.id,
      },
      data: {
        paid: true,
        start: new Date(),
        end: addDays(new Date(), 30),
      },
    });
    return res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to validate subscription");
  }
};

// Read Subscription by ID
export const getSubscriptionById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) return res.status(404).json("Subscription not found");

    return res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to fetch subscription");
  }
};

// Update Subscription
export const updateSubscription = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const {
      type,
      start,
      end,
      paid,
    }: { type?: SubscriptionType; start?: Date; end?: Date; paid?: boolean } =
      req.body;

    const updatedSubscription = await prisma.subscription.update({
      where: { id },
      data: { type, start, end, paid },
    });

    return res.status(200).json(updatedSubscription);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to update subscription");
  }
};

// Delete Subscription
export const deleteSubscription = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    await prisma.subscription.delete({
      where: { id },
    });

    return res.status(200).json("Subscription deleted successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Failed to delete subscription");
  }
};
