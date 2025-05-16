import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { ICategoryFilter } from "../interfaces/filters/ICategoryFilter";

interface CategoryFilterCreationAttributes extends Optional<ICategoryFilter, "id"> {}

export class CategoryFilterModel extends Model<ICategoryFilter, CategoryFilterCreationAttributes> implements ICategoryFilter {
    public id!: number;
    public category_id!: number;
    public filter_id!: number;
}

CategoryFilterModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    filter_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "category_filters",
    timestamps: false
});
