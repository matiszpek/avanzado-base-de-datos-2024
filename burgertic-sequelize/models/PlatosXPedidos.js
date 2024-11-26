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
        cantidad: {
            type: DataTypes.INTEGER,
        },
        id_pedido: {
            type: DataTypes.INTEGER,
        },
        id_plato: {
            type: DataTypes.INTEGER,
        }
       
    },
    {
        sequelize,
        modelName: "PlatosXPedidos",
        tableName: 'pedidos_platos',
        timestamps: false,
    }
);