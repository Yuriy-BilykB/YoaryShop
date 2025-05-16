import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import {IUser} from "../interfaces/IUser";

interface UserCreationAttributes extends Optional<IUser, "id"> {}

export class UserModel extends Model<IUser, UserCreationAttributes> implements IUser {
    public id!: number;
    public email!: string;
    public password!: string;
    public first_name!: string;
    public last_name!: string;
    public is_guest!: boolean;
    public created_at!: Date;
    public phone_number!: string;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_guest: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: "users",
    timestamps: false
});
