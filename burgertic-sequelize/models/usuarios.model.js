import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Usuarios extends Model {}

Usuarios.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
        },
        apellido: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        admin: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        sequelize,
        modelName: 'Usuarios',
        timestamps: false,
    }
);