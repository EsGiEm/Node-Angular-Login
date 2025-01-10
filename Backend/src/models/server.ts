import express, { Application } from 'express';
import sequelize from '../database/connection';
import RUser from '../routes/user';
import RProduct from '../routes/product';
import { User } from './user'; // User tipo sequeleize
import { Product } from './products';
import cors from "cors";
import helmet from 'helmet';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3017";
        this.listen();
        this.middlewares();
        this.router();
        this.DBconnect();

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Listening form port: " + this.port);
        })
    }

    router(){
        this.app.use(RUser);
        this.app.use(RProduct);
    }

middlewares() {
    this.app.use(express.json());
    this.app.use(cors())
    this.app.use(helmet())
}

    async DBconnect() {
        try {
               // await sequelize.authenticate();
               await User.sync({ alter: true}); // User es tipo sequelize
               await Product.sync({ alter: true}); // User es tipo sequelize
               console.log('The table for the User model was just (re) created')
               console.log("Conexión exitosa");
        } catch (error) {
               console.log("Error de conexión: ", error);
        }
    }
}

export default Server