import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class Pedidos extends Model {}

Pedidos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_usuario: { 
            type: DataTypes.INTEGER,
        },
        fecha: {
            type: DataTypes.DATE,
        },
        estado: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        modelName: "Pedidos",
        timestamps: false,
    }
);