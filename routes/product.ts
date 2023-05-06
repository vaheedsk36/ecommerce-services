import express from "express";
import {
  getProductsCount,
  getProducts,
  getFeaturedProducts,
  getProductsById,
  addNewProduct,
  updateProductById,
  deleteProductById,
} from "../modules/product";

const router = express.Router();
// convert it into postgres 
router.get("/", getProducts);
//remove
router.get("/get/count", getProductsCount);
//on hold
router.get("/get/featured", getFeaturedProducts);
router.get("/:id", getProductsById);
router.post("/", addNewProduct);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

export default router;
