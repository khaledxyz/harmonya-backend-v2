import { Router } from "express";
import {
  createCategory,
  createSubCategory,
  deleteCategory,
  deleteSubCategory,
  getAllCategories,
  getAllSubCategories,
  getCategoryById,
  getSubCategoryById,
  updateCategory,
  updateSubCategory,
} from "../controllers/categories.controller";

const router = Router();

const subCategoryRouter = Router();

subCategoryRouter.post("/", createSubCategory);

subCategoryRouter.get("/", getAllSubCategories);

subCategoryRouter.get("/:id", getSubCategoryById);

subCategoryRouter.put("/:id", updateSubCategory);

subCategoryRouter.delete("/:id", deleteSubCategory);

router.use("/sub", subCategoryRouter);

router.post("/", createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export { router as categoriesRouter };
