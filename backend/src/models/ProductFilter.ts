import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { IProductFilter } from "../interfaces/filters/IProductFilter";

interface ProductFilterCreationAttributes extends Optional<IProductFilter, "id"> {}

export class ProductFilterModel extends Model<IProductFilter, ProductFilterCreationAttributes> implements IProductFilter {
    public id!: number;
    public product_id!: number;
    public filter_id!: number;
    public value!: string;
}

ProductFilterModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    filter_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "product_filters",
    timestamps: false
});
