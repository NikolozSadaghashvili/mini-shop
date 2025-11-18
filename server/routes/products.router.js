import express from "express";
import {
  createProduct,
  getAllProducts,
  getMyProducts,
  getSingleProduct,
} from "../contoller/products.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/my-products", authMiddleware, getMyProducts);
router.get("/:id", getSingleProduct);
router.post("/", authMiddleware, createProduct);

export default router;
