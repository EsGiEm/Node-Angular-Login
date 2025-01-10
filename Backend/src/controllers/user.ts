import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response): Promise<void>=>{
    const {name, lastname, password, email, credential } = req.body
    
    // VALIDAR SI USUARIO EXISTE EN BBDD (email y credential tienen que ser unique) [Op.or] es para hacer OR dentro del where
   
   
    try{
    const user = await User.findOne({where: {[Op.or]: {email: email, credential: credential}}})

    if(user){
         res.status(400).json({
            msg:`Usuario ya existe con email ${email} o la credencial ${credential}`
        })
        return;


    }

    
    const passwordHash = await bcrypt.hash(password,10);

    
    await User.create({
        name: name,
        lastname: lastname,
        email: email,
        password: passwordHash,
        credential: credential,
        status: 1,
        
    });

    
    res.json({
        msg: `User ${name} ${lastname} create succes...`
    })
    
}catch(error){
    res.status(400).json({
        msg:`Error al crear el usuario ${name} ${lastname}`
    })
}

}
export const login = async (req: Request, res: Response)=>{
    
    const { password, email } = req.body;

    const user: any = await User.findOne({where:{email: email}})
    
    

    if(!user){
        res.status(400).json({
           msg:`Usuario no existe con email ${email} `
       })
       return;
    }

    const passwordValid = await bcrypt.compare(password,user.password);
    
    if(!passwordValid){
        res.status(400).json({
           msg:`Password ${password} incorrecto  `
       })
       return;
    }


    const token = jwt.sign({email: email}, 
                            process.env.SECRET_KEY || 'esGiEm',
                           {expiresIn: '30000'})

    res.json({
       token
    })
    


    //res.json({
        //msg: "INICIO DE SESIÓN EXITOSO => ",
        //body: req.body
    //})

}
