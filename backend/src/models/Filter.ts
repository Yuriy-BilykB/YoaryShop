import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { IFilter } from "../interfaces/filters/IFilter";
import {ProductFilterModel} from "./ProductFilter";

interface FilterCreationAttributes extends Optional<IFilter, "id"> {}

export class FilterModel extends Model<IFilter, FilterCreationAttributes> implements IFilter {
    public id!: number;
    public name!: string;
    public filterValues?: ProductFilterModel[];
}

FilterModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "filters",
    timestamps: false
});
