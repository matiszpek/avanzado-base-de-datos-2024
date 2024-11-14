import { Pedido } from "./pedidos.model";
import { Platos } from "./platos.model";
import { PlatosXPedidos } from "./PlatosXPedidos";
import { Usuarios } from "./usuarios.model";

import { sequelize } from "../db";

Pedido.belongsTo(Usuarios, { foreignKey: "id_usuario" });
Usuarios.hasMany(Pedido, { foreignKey: "id_usuario" });
Platos.belongsToMany(Pedido, { through: PlatosXPedidos, foreignKey: "id_plato" });
Pedido.belongsToMany(Platos, { through: PlatosXPedidos, foreignKey: "id_pedido" });

sequelize.sync({ force: true }).then(() => {
    console.log("Tablas sincronizadas");
});