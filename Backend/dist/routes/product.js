"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validateToken_1 = __importDefault(require("./validateToken"));
// No sé si debo dejarlo como router o RProduct ya que en el models-server lo importo como RProduct
const router = (0, express_1.Router)();
router.post("/api/product/register", product_1.registerProduct); // De momento no se usa
router.get("/api/product/getProducts", validateToken_1.default, product_1.getProducts);
exports.default = router;
