import express from "express";
import {
  getProductsById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
  addNewProducts,
} from "../modules/product";

const router = express.Router();
router.get("/category/:categoryId", getProductsByCategory);
router.get("/id/:id", getProductsById);
router.post("/add-products", addNewProducts);
router.put("/id/:id", updateProductById);
router.delete("/id/:id", deleteProductById);

export default router;
