import { Router } from "express";
import productController from "../controllers/productController";

const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/seller/:sellerId", productController.getSellerProducts);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;