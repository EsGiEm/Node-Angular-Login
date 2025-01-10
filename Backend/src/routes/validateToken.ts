import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";


const validateToken = (req: Request, res: Response, next: NextFunction)=>{

    const headersToken = req.headers['authorization'];
    console.log(`Este es el token ${headersToken}`);

    if(headersToken != undefined && headersToken.startsWith("Bearer ")){
        try{
        const token = headersToken.slice(7) // Para separar el Bearer + espacio "Bearer eyJhbGcihjjhBBBjjjuuuhhhhh1199...
        jwt.verify(token, process.env.SECRET_key || 'esGiEm')
        next()}catch(error){
           if(error instanceof TokenExpiredError){
            res.status(401).json({msg: "La sesión ha finalizado"})
           }
           else if(error instanceof JsonWebTokenError){
            res.status(401).json({msg: "Token inválido"})
           }
           else{
            res.status(500).json({msg: "Error interno del servidor"})
           }
           return

        }
    }else{
        res.status(401).json({ msg: "Acceso denegado"})
        return

    }

    
}

export default validateToken