import { Router, Request, Response } from "express";

import { categoriesRouter } from "./categories.router";

import {
  deleteFromCloudinaryController,
  dynamicImageUpload,
} from "../middlewares/imageUpload.middleware";
import { RequestWithImages } from "../types";

const router = Router();

router.post(
  "/upload",
  dynamicImageUpload,
  (req: RequestWithImages, res: Response) => {
    console.log("images: ", req.images);
    res.send(req.images);
  }
);

router.delete("/upload", deleteFromCloudinaryController);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns a Hello World message
 *     responses:
 *       200:
 *         description: Hello World message
 */
router.get("/", (_: Request, res: Response) => {
  res.send("Hello, World!");
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Returns the health status of the API
 *     responses:
 *       200:
 *         description: Health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 */
router.get("/health", (_: Request, res: Response) => {
  res.json({ status: "healthy" });
});

/**
 * @swagger
 * /current-language:
 *   get:
 *     summary: Returns the current language message
 *     responses:
 *       200:
 *         description: Current language message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 language:
 *                   type: string
 *                   example: "English"
 */
router.get("/current-language", (req: Request, res: Response) => {
  res.json({ language: req.t("debug:currentLangue") });
});

router.use("/category", categoriesRouter);

export { router };
