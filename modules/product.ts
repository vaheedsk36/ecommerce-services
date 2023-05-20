import { Request, Response } from "express";
import { logger } from "../middlewares/logger";
import {
  addProductsToDb,
  deleteProductByID,
  getProductsDataByCategory,
  getProductsDataById,
  updateProductByID,
} from "../dao/productsDAO";
import { setAttributes } from "../utils/common";

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const productsList = await getProductsDataByCategory(
      +req.params.categoryId
    );
    if (!productsList) {
      throw new Error("Failed to get products data");
    }
    res.send(productsList);
  } catch (err) {
    logger.error(err);
    res.status(400).json({ success: false });
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const productsList = await getProductsDataById(+req.params.id);
    if (!productsList) {
      throw new Error("Failed to get products data");
    }
    res.send(productsList);
  } catch (err) {
    logger.error(err);
    res.status(400).json({ success: false });
  }
};

export const addNewProducts = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      assetUrl,
      categoryId,
      quantity,
      sellerDetails,
      category,
      specifications,
      companyId,
    } = req.body;
    const product = await addProductsToDb(
      name,
      description,
      price,
      assetUrl,
      categoryId,
      quantity,
      sellerDetails,
      category,
      specifications,
      companyId
    );

    if (!product) {
      res.status(400).json({ status: false });
    }
    res.status(201).json(product);
  } catch (err) {
    logger.error(err);
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const updatedParams = req.body.updatedParams;
    const updatedProductData = Object.keys(updatedParams).map((attribute) =>
      setAttributes(attribute, updatedParams)
    );
    const productUpdateStatus = await updateProductByID(
      `id = ${+req.params.id}`,
      updatedProductData
    );
    if (!productUpdateStatus) {
      res.status(400).json({
        status: false,
        message: "Unable to update the product ",
      });
    }

    res.status(200).json(productUpdateStatus);
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const product = await deleteProductByID(`id = ${req.params.id}`);
    if (product) {
      return res.status(200).json({
        success: true,
        message: "Product has been deleted",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};
