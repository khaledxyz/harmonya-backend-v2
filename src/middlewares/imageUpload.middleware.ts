import multer, { FileFilterCallback } from "multer";

import { Request, Response, NextFunction } from "express";

import cloudinary from "../config/cloudinary";

import path from "path";
import crypto from "crypto";
import { RequestWithImages } from "../types";

const upload = multer({
  // storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    // Check if the file type is allowed (e.g., image)
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

const uploadToCloudinary = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error: any, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      })
      .end(file.buffer);
  });
};

const deleteFromCloudinary = async (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const publicId = url.split("/").pop()?.split(".")[0];
    if (!publicId) {
      return reject(new Error("Invalid URL: Unable to extract public ID."));
    }

    cloudinary.uploader.destroy(publicId, (error: any, result: any) => {
      if (error) {
        reject(error);
      } else if (result.result !== "ok") {
        reject(new Error("Failed to delete image from Cloudinary."));
      } else {
        resolve();
      }
    });
  });
};

export const deleteFromCloudinaryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { url } = req.body;
    await deleteFromCloudinary(url);
    res.status(200).json({ message: "Image deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting image." });
  }
};

export const dynamicImageUpload = async (
  req: RequestWithImages,
  res: Response,
  next: NextFunction
) => {
  upload.any()(req, res, async (err: any) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(400).json({ message: "Multer error: " + err.message });
    } else if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error: " + err.message });
    }

    try {
      req.images = {};
      const uploadPromises: Record<string, Promise<any>[]> = {};

      // Iterate over each file to upload to Cloudinary
      if (req.files) {
        console.log(req.files);
        (req.files as Express.Multer.File[]).forEach((file) => {
          if (!uploadPromises[file.fieldname]) {
            uploadPromises[file.fieldname] = [];
          }
          uploadPromises[file.fieldname].push(
            uploadToCloudinary(file).catch((error) => {
              console.error(error);
            })
          );
        });
      }

      // Resolve all upload promises
      console.log("promises:", uploadPromises);
      for (const field in uploadPromises) {
        if (req.images === undefined) req.images = {};
        req.images[field] = await Promise.all(uploadPromises[field]);
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.log(error);
      res.status(500).send("Error uploading to Cloudinary.");
    }
  });
};
