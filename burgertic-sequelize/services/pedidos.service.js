import { config } from "../db.js";
import pkg from "pg";
import { Pedido } from "../models/pedidos.model.js";
import { PlatosXPedidos } from "../models/PlatosXPedidos.js";
const { Client } = pkg;


// Lean, no se que devolver en los que son solo await, updates y deletes no tengo rows para devolver



const getPlatosByPedido = async (idPedido) => {
    const client = new Client(config);
    await client.connect();

    try {
        const pedido= await Pedido.getPedidoById(idPedido)
        const platos= pedido.getPlatos()

        if (platos.length< 1) throw new Error("Pedido no encontrado");

        await client.end();
        return platos;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPedidos = async () => {
    const client = new Client(config);
    await client.connect();

    try {
        const pedidos= await Pedido.findAll()

        if (pedidos.length < 1) return [];

        const result = await Promise.all(
            rows.map(async (pedido) => {
                const platos = await getPlatosByPedido(pedido.id);
                return {
                    ...pedido,
                    platos,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPedidoById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {


        result = await getPlatosByPedido(id);

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPedidosByUser = async (idUsuario) => {
    const client = new Client(config);
    await client.connect();

    try {
            const result= await Pedido.getPedidosByUser(idUsuario)
            if (result.length < 1) return [];

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const createPedido = async (idUsuario, platos) => {
    const client = new Client(config);
    await client.connect();

    try {
        // ACÁ SE PODRÍA HACER EN ETAPAS
        // 1. Validar que los platos existan
        // 2. Crear el pedido
        // 3. Agregar los platos al pedido

        // Así, no hace falta introducir el concepto de transacciones o rollback

        /* const { rows } = await client.query(
            "INSERT INTO pedidos (id_usuario, fecha, estado) VALUES ($1, $2, 'pendiente') RETURNING id",
            [idUsuario, new Date()]
        ); */
        const pedido = await Pedido.create({
            id_usuario: idUsuario,
            fecha: new Date(),
            estado: "pendiente",
        });
            /* await client.query(
                "INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES ($1, $2, $3)",
                [idPedido, plato.id, plato.cantidad]
            ); */ //esto se hace solo con el modulo de sqlize ya que ya estan relacionadas las tablas

            for (const plato of platos) {
                await PlatosXPedidos.create({
                    id_pedido: pedido.id,
                    id_plato: plato.id,
                    cantidad: plato.cantidad,
                });
            }

        await client.end();
        return pedido;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    )
        throw new Error("Estado inválido");

    const client = new Client(config);
    await client.connect();

    try {
        Pedido.update({'estado':estado},{"where": {'id':id}});
        await client.end();
        return;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const deletePedido = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
    await Pedido.destroy({"where": {'id':id}});

        await client.end();
        return;
    } catch (error) {
        await client.end();
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
