import { Request, Response } from "express";
import prisma from "../config/db";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const category = await prisma.category.create({
      data: {
        title,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create category" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Invalid or missing title" });
    }

    const category = await prisma.category.update({
      where: { id },
      data: { title },
    });

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(500).json({ error: "Failed to update category" });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(500).json({ error: "Failed to delete category" });
  }
};

// Create a SubCategory
export const createSubCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, categoryId } = req.body;

    if (!title || !categoryId) {
      return res
        .status(400)
        .json({ error: "Missing required fields: title or categoryId" });
    }

    const subCategory = await prisma.subCategory.create({
      data: {
        title,
        categoryId,
      },
    });

    return res.status(201).json(subCategory);
  } catch (error) {
    console.error("Error creating SubCategory:", error);
    return res.status(500).json({ error: "Failed to create SubCategory" });
  }
};

// Get all SubCategories
export const getAllSubCategories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: { category: true, services: true }, // Include related data if needed
    });

    return res.status(200).json(subCategories);
  } catch (error) {
    console.error("Error fetching SubCategories:", error);
    return res.status(500).json({ error: "Failed to fetch SubCategories" });
  }
};

// Get a SubCategory by ID
export const getSubCategoryById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const subCategory = await prisma.subCategory.findUnique({
      where: { id },
      include: { category: true, services: true }, // Include related data if needed
    });

    if (!subCategory) {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    return res.status(200).json(subCategory);
  } catch (error) {
    console.error("Error fetching SubCategory:", error);
    return res.status(500).json({ error: "Failed to fetch SubCategory" });
  }
};

// Update a SubCategory
export const updateSubCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "No fields provided to update" });
    }

    const subCategory = await prisma.subCategory.update({
      where: { id },
      data: { title },
    });

    return res
      .status(200)
      .json({ message: "SubCategory updated successfully", subCategory });
  } catch (error: any) {
    console.error("Error updating SubCategory:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    return res.status(500).json({ error: "Failed to update SubCategory" });
  }
};

// Delete a SubCategory
export const deleteSubCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    await prisma.subCategory.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "SubCategory deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting SubCategory:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ error: "SubCategory not found" });
    }

    return res.status(500).json({ error: "Failed to delete SubCategory" });
  }
};
