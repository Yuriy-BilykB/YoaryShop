import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "my_shop",
    "mysqladmin",
    "MyS3cureP@ssw0rd!",
    {
        host: "myshop-mysql-server.mysql.database.azure.com",
        port: 3306,
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