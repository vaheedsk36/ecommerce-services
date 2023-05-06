import { Request, Response } from "express";
import Product from "../models/product";
import mongoose from "mongoose";
import { logger } from "../middlewares/logger";
import { getProductsDataByCategory, getProductsDataById } from "../dao/productsDAO";

export const getProducts = async (req: Request, res: Response) => {
  try{
    const productsList = await Product.find().populate("category");
    if (!productsList) {
      throw new Error("Failed to get requested data")
    }
    res.send(productsList);

  }catch(err){
    logger.error(err);
    res.status(500).json({ success: false });
  }

};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try{
    const productsList = await getProductsDataByCategory(+req.params.categoryId);
    if (!productsList) {
      throw new Error("Failed to get products data")
    }
    res.send(productsList);

  }catch(err){
    logger.error(err);
    res.status(400).json({ success: false });
  }

};

export const getProductsById = async (req: Request, res: Response) => {
  try{
    const productsList = await getProductsDataById(+req.params.id);
    if (!productsList) {
      throw new Error("Failed to get products data")
    }
    res.send(productsList);

  }catch(err){
    logger.error(err);
    res.status(400).json({ success: false });
  }
};

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    let product = new Product({
      name: req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock,
      description:req.body.description
    });
    product = await product.save();
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
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid product id");
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
      },
      {
        new: true,
      }
    );
    if (!product) {
      res.status(400).json({
        status: false,
        message: "Unable to update the product ",
      });
    }
    res.send(product);
  } catch (err) {
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
