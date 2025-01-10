"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, password, email, credential } = req.body;
    // VALIDAR SI USUARIO EXISTE EN BBDD (email y credential tienen que ser unique) [Op.or] es para hacer OR dentro del where
    try {
        const user = yield user_1.User.findOne({ where: { [sequelize_1.Op.or]: { email: email, credential: credential } } });
        if (user) {
            res.status(400).json({
                msg: `Usuario ya existe con email ${email} o la credencial ${credential}`
            });
            return;
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        yield user_1.User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            status: 1,
        });
        res.json({
            msg: `User ${name} ${lastname} create succes...`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Error al crear el usuario ${name} ${lastname}`
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    const user = yield user_1.User.findOne({ where: { email: email } });
    if (!user) {
        res.status(400).json({
            msg: `Usuario no existe con email ${email} `
        });
        return;
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        res.status(400).json({
            msg: `Password ${password} incorrecto  `
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email: email }, process.env.SECRET_KEY || 'esGiEm', { expiresIn: '30000' });
    res.json({
        token
    });
    //res.json({
    //msg: "INICIO DE SESIÓN EXITOSO => ",
    //body: req.body
    //})
});
exports.login = login;
