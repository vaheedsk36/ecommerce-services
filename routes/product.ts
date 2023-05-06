import express from "express";
import {
  getProductsById,
  addNewProduct,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
} from "../modules/product";

const router = express.Router();
// convert it into postgres 
router.get("/:categoryId", getProductsByCategory);

//TODO change the below
router.get("/:id", getProductsById);
router.post("/", addNewProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
