import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const banco = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    host: process.env.DB_HOST,
    logging: true, 
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default banco;