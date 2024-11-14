import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class PlatosXPedidos extends Model {}

PlatosXPedidos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_pedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        id_plato: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "platosXPedidos",
        timestamps: false,
    }
);
