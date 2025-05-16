import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../db/db";
import {ICategory} from "../interfaces/ICategory";
interface CategoryCreationAttributes extends Optional<ICategory, "id"> {}
export class CategoryModel extends Model<ICategory, CategoryCreationAttributes> implements ICategory {
    public id!: number;
    public name!: string;
    public parent_id!: number | null;
}

CategoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "categories",
    timestamps: false
});
