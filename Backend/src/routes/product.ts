import { Router } from "express";
import { getProducts, registerProduct } from "../controllers/product";
import validateToken from "./validateToken";

// No sé si debo dejarlo como router o RProduct ya que en el models-server lo importo como RProduct
const router = Router();

router.post("/api/product/register", registerProduct); // De momento no se usa
router.get("/api/product/getProducts", validateToken, getProducts);

export default router