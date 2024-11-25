import { config } from "../db.js";
import { Pedido } from "../models/pedidos.model.js";
import { PlatosXPedidos } from "../models/PlatosXPedidos.js";


//hola lean, como va.
// si estas aca es seguro porque no corrio bien el codigo 
//y la posta es que no lo puede correr porque no me anda node. espero que ande porque no lo voy a testear 
// saludos y suerte corriguiendo el codigo
//pd: soy lucas


const getPlatosByPedido = async (idPedido) => {
    try {
        const pedido= await Pedido.findAll( {"where": {'id':idPedido}})
        if (!pedido) throw new Error("Pedido no encontrado");
        
        const platosiD = await PlatosXPedidos.findAll( {"where": {'id_pedido':idPedido}})
        if (platosiD.length < 1) throw new Error("no tiene platos este pedido");

        return platosiD.map((p) => ({
            pedidoId: p.id_pedido,
            cantidad: p.cantidad,
        }));
        
    } catch (error) {
        throw error;
    }
};

const getPedidos = async () => {
    try {
        const pedidos= await Pedido.findAll()
        
        if (pedidos.length < 1) return [];

        return Promise.all(
            pedidos.map(async (p) => ({
                id: p.id,
                idUsuario: p.UsuarioId,
                fecha: p.fecha,
                estado: p.estado,
                platos: await getPlatosByPedido(p.id),
            }))
        );

    } catch (error) {
        throw error;
    }
};

const getPedidoById = async (id) => {
    try {
        const pedido= await Pedido.findAll( {"where": {'id':id}})
        if (!pedido) throw new Error("Pedido no encontrado");

        return {
            id: pedido.id,
            idUsuario: pedido.UsuarioId,
            fecha: pedido.fecha,
            estado: pedido.estado,
            platos: await getPlatosByPedido(pedido.id),
          };        
    } catch (error) {
        throw error;
    }
};

const getPedidosByUser = async (idUsuario) => {
    try {
        const pedidos= await Pedido.findAll( {"where": {'UsuarioId':idUsuario}})
        if (pedidos.length < 1) return [];
        
        
        return Promise.all(
            pedidos.map(async (p) => ({
                id: p.id,
                idUsuario: p.UsuarioId,
                fecha: p.fecha,
                estado: p.estado,
                platos: await getPlatosByPedido(p.id),
            }))
        );

    } catch (error) {
        throw error;
    }
};

const createPedido = async (idUsuario, platos) => {
    try {
        
        const pedido = await Pedido.create({ UsuarioId: idUsuario, fecha: new Date(), estado: "pendiente" });
        await Promise.all(
            platos.map((plato) =>
                PlatosXPedidos.create({ id_pedido: pedido.id, id_plato: plato.id, cantidad: plato.cantidad })
            )
        );
        return pedido;
    } catch (error) {
        throw error;
    }
};

const updatePedido = async (id, estado) => {
    if (estado !== "aceptado" && estado !== "en camino" && estado !== "entregado")throw new Error("Estado inválido");
    try {
        Pedido.update({'estado':estado},{"where": {'id':id}});
        return;
    } catch (error) {
        throw error;
    }
};

const deletePedido = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        await Pedido.destroy({"where": {'id':id}}); 
        return;
    } catch (error) {
        throw error;
    }
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};
