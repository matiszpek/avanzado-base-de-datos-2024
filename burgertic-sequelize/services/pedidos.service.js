import { config } from "../db.js";
import pkg from "pg";
import pedidos, { Pedido } from "../models/pedidos.model.js";
import platopedidos, {PlatosXPedidos} from "../models/platopedidos.model.js";
const { Client } = pkg;

const getPlatosByPedido = async (idPedido) => {
    const client = new Client(config);
    await client.connect();

    try {
        const {rows}= await platopedidos.findAll({"where": {'id':idPedido}});

        if (rows.length < 1) throw new Error("Pedido no encontrado");

        const result = await Promise.all(
            rows.map(async (plato) => {
                const {rows}=await platos.findAll({"where": {'id':id_plato}})

                if (rows.length < 1) throw new Error("Plato no encontrado");

                return {
                    ...rows[0],
                    cantidad: plato.cantidad,
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

const getPedidos = async () => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await Pedido.findAll()

        if (rows.length < 1) return [];

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
        const { rows } = await Pedido.findAll({"where": {'id':id}})
        if (rows.length < 1) return null;

        const result = rows[0];

        result.platos = await getPlatosByPedido(id);

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPedidosByUser = async (idUsuario) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await Pedido.findAll({"where": {'id_usuario':idUsuario}});

        if (rows.length < 1) return [];

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
        const pedido = await pedidos.create({
            id_usuario: idUsuario,
            fecha: new Date(),
            estado: "pendiente",
        });
        const idPedido = pedido.id;
        
        for (const plato of platos) {
            if (rows.length < 1) {
                pedido.destroy();
                PlatosXPedidos.destroy()
                throw new Error("Plato no encontrado");
            }

            /* await client.query(
                "INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES ($1, $2, $3)",
                [idPedido, plato.id, plato.cantidad]
            ); */ //esto se hace solo con el modulo de sqlize ya que ya estan relacionadas las tablas

            PlatosXPedidos.addplatos({
                idPedido:idPedido,
                id_plato:plato.id,
                cantidad:plato.cantidad
            })
        }

        await client.end();
        return rows;
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
        const { rows } = await Pedido.update({'estado':estado},{"where": {'id':id}});

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const deletePedido = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await Pedido.destroy({"where": {'id':id}});

        await client.end();
        return rows;
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
