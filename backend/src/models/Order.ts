import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { IOrderInfo } from "../interfaces/IOrder";

interface OrderAttributes extends IOrderInfo {
    id: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> {}

export class OrderModel extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public lastName!: string;
    public firstName!: string;
    public phone!: string;
    public region!: string;
    public city!: string;
    public warehouse!: string;
    public payment!: string;
    public comment!: string;
    public register!: boolean;
    public userId!: number | null;
    public isDone!: boolean;
    public totalSum!: number;
    public sessionId!: string | null;

    public readonly createdAt!: Date;
}

OrderModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        warehouse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        payment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        register: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        totalSum: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: false
    }
);
