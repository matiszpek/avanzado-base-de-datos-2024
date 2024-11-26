import { Pedido } from "./pedidos.model";
import { Plato } from "./platos.model";
import { PlatosXPedidos } from "./PlatosXPedidos";
import { Usuario } from "./usuarios.model";

import { sequelize } from "../db";



export const defModelos = async()=>{
    Pedido.belongsTo(Usuario, { foreignKey: 'UsuarioId' });
    Usuario.hasMany(Pedido,{ foreignKey: 'UsuarioId' });
    Pedido.belongsToMany(Plato, {through: PlatosXPedidos,
        foreignKey: 'id_pedido',
        otherKey: 'id_plato',
        as: 'plato',});
    Plato.belongsToMany(Pedido, {through: PlatosXPedidos,
        foreignKey: 'id_plato',
        otherKey: 'id_pedido',
        as: 'pedido',});
}  
sequelize.sync({ force: true }).then(() => {
    console.log("Tablas sincronizadas");
});

