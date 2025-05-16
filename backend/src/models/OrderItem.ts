import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

export class OrderItemModel extends Model {
    public id!: number;
    public order_id!: number;
    public product_id!: number;
    public quantity!: number;
}

OrderItemModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "order_items",
    timestamps: false
});
