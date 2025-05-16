import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { IProduct } from "../interfaces/IProduct";

interface ProductCreationAttributes extends Optional<IProduct, "id"> {}

export class ProductModel extends Model<IProduct, ProductCreationAttributes> implements IProduct {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public discount_price!: number | null;
    public category_id!: number;
    public brand!: string;
    public stock!: number;
    public is_new!: boolean;
    public is_popular!: boolean;
    public created_at!: Date;
}

ProductModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount_price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_new: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    is_popular: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: "products",
    timestamps: false
});
