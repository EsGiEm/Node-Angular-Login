"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headersToken = req.headers['authorization'];
    console.log(`Este es el token ${headersToken}`);
    if (headersToken != undefined && headersToken.startsWith("Bearer ")) {
        try {
            const token = headersToken.slice(7); // Para separar el Bearer + espacio "Bearer eyJhbGcihjjhBBBjjjuuuhhhhh1199...
            jsonwebtoken_1.default.verify(token, process.env.SECRET_key || 'esGiEm');
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                res.status(401).json({ msg: "La sesión ha finalizado" });
            }
            else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                res.status(401).json({ msg: "Token inválido" });
            }
            else {
                res.status(500).json({ msg: "Error interno del servidor" });
            }
            return;
        }
    }
    else {
        res.status(401).json({ msg: "Acceso denegado" });
        return;
    }
};
exports.default = validateToken;
