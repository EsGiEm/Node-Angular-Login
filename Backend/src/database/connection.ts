import { Sequelize } from "sequelize";

const sequelize = new Sequelize('api_nodejs', 'root', '060516', {
    host: 'localhost',
    dialect:'mysql'
})

export default sequelize 