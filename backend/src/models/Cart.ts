import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import {ICartItem} from "../interfaces/ICart";

interface CartItemCreationAttributes extends Optional<ICartItem, "id" | "created_at"> {}

export class CartItemModel extends Model<ICartItem, CartItemCreationAttributes> implements ICartItem {
    public id!: number;
    public user_id!: number | null;
    public session_id!: string | null;
    public product_id!: number;
    public quantity!: number;
    public created_at!: Date;
}

CartItemModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    session_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: "cart_items",
    timestamps: false
});
