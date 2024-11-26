import { Pedido } from "./pedidos.model";
import { Plato } from "./platos.model";
import { PlatosXPedidos } from "./PlatosXPedidos";
import { Usuario } from "./usuarios.model";

import { sequelize } from "../db";

Pedido.belongsTo(Usuario, { foreignKey: "id_usuario" });
Usuario.hasMany(Pedido, { foreignKey: "id_usuario" });
Plato.belongsToMany(Pedido, { through: PlatosXPedidos, foreignKey: "id_plato" });
Pedido.belongsToMany(Plato, { through: PlatosXPedidos, foreignKey: "id_pedido" });


sequelize.sync({ force: true }).then(() => {
    console.log("Tablas sincronizadas");
});