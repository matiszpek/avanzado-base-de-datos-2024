import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class PedidosPlatos extends Model {}

PedidosPlatos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
        },
        PedidoId: {
            type: DataTypes.INTEGER,
        },
        platoId: {
            type: DataTypes.INTEGER,
        }
       
    },
    {
        sequelize,
        tableName: 'pedidos_platos',
        timestamps: false,
    }
);