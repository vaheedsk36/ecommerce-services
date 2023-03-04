import { Request, Response } from "express";
import Product from "../models/product";
import mongoose from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
  const productsList = await Product.find().populate("category");
  if (!productsList) {
    res.status(500).json({ success: false });
  }
  res.send(productsList);
};

export const getProductsCount = async (req: Request, res: Response) => {
  const productsCount = await Product.countDocuments();
  if (!productsCount) {
    res.status(500).json({ success: false });
  }
  res.send({ productsCount: productsCount });
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  const productsList = await Product.find({ isFeatured: true });
  if (!productsList) {
    res.status(500).json({ success: false });
  }
  res.send(productsList);
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid product id");
    }
    const productsList = await Product.findById(req.params.id);
    if (!productsList) {
      res.status(400).json({ success: false });
    }
    res.send(productsList);
  } catch (err) {
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    let product = new Product({
      name: req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock,
    });
    product = await product.save();
    if (!product) {
      res.status(400).json({ status: false });
    }
    res.status(201).json(product);
  } catch (err) {
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
