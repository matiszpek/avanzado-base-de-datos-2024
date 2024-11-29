import { Pedido } from "./pedidos.model.js";
import { Plato } from "./platos.model.js";
import { PlatosXPedidos } from "./PlatosXPedidos.js";
import { Usuario } from "./usuarios.model.js";
import { sequelize } from "../db.js";

export const defModelos = async () => {
    Pedido.belongsToMany(Plato, { through: PlatosXPedidos });
    Plato.belongsToMany(Pedido, { through: PlatosXPedidos});
  
    Usuario.hasMany(Pedido);
    Pedido.belongsTo(Usuario);
    console.log("Modelos definidos");
    await sequelize.sync({ force: false, alter: false });
  };