import { Request,Response } from 'express';
import Category from '../models/category';
// import { ApiResponse, CategoryList } from '../types';

export const categoryList = async (req:Request, res:Response) => {
  try {
    const categoriesList = await Category.find();
    if (!categoriesList) {
      res.status(500)
        .json({ success: false, message: "internal server error" });
    }
    res.status(200).json({ status: true, categoriesList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};