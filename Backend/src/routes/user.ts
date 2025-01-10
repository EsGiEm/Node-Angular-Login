import { Router } from "express";
import { login, register } from "../controllers/user";

// LO he cambiado a RUser pero no estoy seguro si había que dejarlo como router min 55
const router = Router();

router.post("/api/user/register", register);
router.post("/api/user/login", login);

export default router