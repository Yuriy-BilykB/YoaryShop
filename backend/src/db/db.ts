import { Sequelize } from "sequelize";
import * as process from "node:process";

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: "myshop-mysql-server.mysql.database.azure.com",
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    }
);