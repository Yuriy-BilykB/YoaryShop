import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import {Iimage} from "../interfaces/Iimage";

interface ImageCreationAttributes extends Optional<Iimage, "id"> {}

export class ImageModel extends Model<Iimage, ImageCreationAttributes> implements Iimage {
    public id!: number;
    public imageUrl!: string;
    public productId!: number;
}

ImageModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "images",
    timestamps: false
})