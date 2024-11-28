import { Pedido } from "./pedidos.model";
import { Plato } from "./platos.model";
import { PlatosXPedidos } from "./PlatosXPedidos";
import { Usuario } from "./usuarios.model";
import { sequelize } from "../db";

export const defModelos = async () => {
    Pedido.belongsToMany(Plato, { through: PlatosXPedidos });
    Plato.belongsToMany(Pedido, { through: PlatosXPedidos});
  
    Usuario.hasMany(Pedido);
    Pedido.belongsTo(Usuario);
    console.log("Modelos definidos");
    await sequelize.sync({ force: false, alter: false });
  };