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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../routes/user"));
const product_1 = __importDefault(require("../routes/product"));
const user_2 = require("./user"); // User tipo sequeleize
const products_1 = require("./products");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3017";
        this.listen();
        this.middlewares();
        this.router();
        this.DBconnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Listening form port: " + this.port);
        });
    }
    router() {
        this.app.use(user_1.default);
        this.app.use(product_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
    }
    DBconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await sequelize.authenticate();
                yield user_2.User.sync({ alter: true }); // User es tipo sequelize
                yield products_1.Product.sync({ alter: true }); // User es tipo sequelize
                console.log('The table for the User model was just (re) created');
                console.log("Conexión exitosa");
            }
            catch (error) {
                console.log("Error de conexión: ", error);
            }
        });
    }
}
exports.default = Server;
