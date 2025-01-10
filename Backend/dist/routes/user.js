"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
// LO he cambiado a RUser pero no estoy seguro si había que dejarlo como router min 55
const router = (0, express_1.Router)();
router.post("/api/user/register", user_1.register);
router.post("/api/user/login", user_1.login);
exports.default = router;
