import { Request, Response } from "express";
import Product from "../models/product";
import mongoose from "mongoose";
import { logger } from "../middlewares/logger";
import {
  addProductsToDb,
  getProductsDataByCategory,
  getProductsDataById,
  updateProductByID,
} from "../dao/productsDAO";

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
      specifications
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

const setAttributes = (attribute, updatedParams) => {
  switch (attribute) {
    case "description":
      return `description = '${updatedParams[attribute]}'`;
    case "price":
      return `price = ${updatedParams[attribute]}`;
    case "assetUrl":
      return `asset_url = '${updatedParams[attribute]}'`;
    case "categoryId":
      return `category_id = ${updatedParams[attribute]}`;
    case "quantity":
      return `quantity = ${updatedParams[attribute]}`;
    case "sellerDetails":
      console.log(updatedParams[attribute],'sellerDetails')
      return `seller_details = '${JSON.stringify(updatedParams[attribute])}'`;
    case "category":
      return `category = '${updatedParams[attribute]}'`;
    case "specifications":
      console.log(updatedParams[attribute],'specifications')
      return `specifications = '${JSON.stringify(updatedParams[attribute])}'`;
  }
};

export const updateProductById = async(req: Request, res: Response) => {
  try{
      const updatedParams = req.body.updatedParams
      const updatedProductData = Object.keys(updatedParams).map(attribute=>setAttributes(attribute,updatedParams));
      const productUpdateStatus = await updateProductByID(`id = ${+req.params.id}`,updatedProductData);
      if (!productUpdateStatus) {
        res.status(400).json({
          status: false,
          message: "Unable to update the product ",
        });
      }

      res.status(200).json(productUpdateStatus);
    }
  catch (err) {
    return res.status(500).json({
      success: false,
      err: err,
    });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid product id");
    }
    const product = await Product.findByIdAndRemove(req.params.id);
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
