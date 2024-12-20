import { config } from "../db.js";
import { Pedido } from "../models/pedidos.model.js";
import { PlatosXPedidos } from "../models/PlatosXPedidos.js";


//hola lean, como va.
// si estas aca es seguro porque no corrio bien el codigo 
// en mi compu corria perfecto.
// saludos y suerte corriguiendo el codigo
//pd: soy lucas


const getPlatosByPedido = async (idPedido) => {
    try {
        const pedido= await Pedido.findOne( {"where": {'id':idPedido}})        
        const platosdata = await PlatosXPedidos.findAll( {"where": {'id_pedido':idPedido}})

        return platosdata.map((p) => ({
            id: p.id_plato,
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
                id_usuario: p.id_usuario,
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
        const pedido= await Pedido.findOne( {"where": {'id':id}})
        if (!pedido) throw new Error("Pedido no encontrado");

        return {
            id: pedido.id,
            id_usuario: pedido.id_usuario,
            fecha: pedido.fecha,
            estado: pedido.estado,
            platos: await getPlatosByPedido(pedido.id),
          };        
    } catch (error) {
        throw error;
    }
};

const getPedidosByUser = async (id_usuario) => {
    try {
        
        console.log(id_usuario);
        const pedidos= await Pedido.findAll( {"where": {'id_usuario':id_usuario}})

        return Promise.all(
            pedidos.map(async (p) => ({
                id: p.id,
                id_usuario: p.id_usuario,
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
        const pedido = await Pedido.create({ id_usuario: idUsuario, fecha: new Date(), estado: 'pendiente' });

        for (let plato of platos) {
            console.log(pedido.id);
            await PlatosXPedidos.create({
                id_pedido: pedido.id,
                id_plato: plato.id,
                cantidad: plato.cantidad,
            });
        }
       
        // await pedido.addPlatos(platos);

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
    const pedido = await Pedido.findByPk(id);
    if (!pedido) throw new Error("Pedido no encontrado");
    
    await pedido.destroy();
    return pedido;
};


export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};
