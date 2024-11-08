import pedidosService from "../services/pedidos.service.js";
import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
        
    */

    try {
        const pedido = await pedidosService.getPedidos()
        return res.status(200).json(pedido);
    }
    catch (error) {
        return res.status(500).json({ error: "Algo falló" });
    }
};

const getPedidosByUser = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener los pedidos del usuario
            2. Si el usuario no tiene pedidos, devolver una lista vacía (status 200)
            3. Si el usuario tiene pedidos, devolver un json con los pedidos (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
    try {
        const pedido = await pedidosService.getPedidosByUser(req.params.id)
        return res.status(200).json(pedido);
    }
    catch (error) {
        return res.status(500).json({ error: "Algo falló" });
    }
};


const getPedidoById = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
    try {
        const pedido = await pedidosService.getPedidoById(req.params.id)
        return res.status(200).json(pedido);
    }
    catch (error) {
        return res.status(500).json({ error: "Algo falló" });
    }
};

const createPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
    // Verificar los datos
    if (!req.body.platos) {
        return res.status(400).json({ error: "El campo platos es requerido" });
    }
    if (!Array.isArray(req.body.platos)) {
        return res.status(400).json({ error: "El campo platos debe ser un array" });
    }
    if (req.body.platos.length === 0) {
        return res.status(400).json({ error: "El array de platos debe tener al menos un plato" });
    }
    for (let i = 0; i < req.body.platos.length; i++) {
        if (!req.body.platos[i].id || !req.body.platos[i].cantidad) {
            return res.status(400).json({ error: "Todos los platos deben tener un id y una cantidad" });
        }
    }

    try {
        const pedido = await pedidosService.createPedido(req.body)
        return res.status(201).json(pedido);
    }
    catch (error) {
        //console.log(error);
        return res.status(500).json({ error: "Algo falló" });
    }
};

const aceptarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const pedido = await pedidosService.getPedidoById(req.params.id)
    if (!pedido) {
        return res.status(404).json({ error: "El pedido no existe" });
    }
    if (pedido.estado !== "pendiente") {
        return res.status(400).json({ error: "El pedido no está en estado pendiente" });
    }
    try {
        await pedidosService.updatePedido(req.params.id, { estado: "aceptado" });
        return res.status(200).json({ message: "Pedido aceptado" });
    }
    catch (error) {
        return res.status(500).json({ error: "Algo falló" });
    }
};

const comenzarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "aceptado"
            4. Si el pedido no está en estado "aceptado", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "aceptado", actualizar el estado del pedido a "en camino"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const pedido = await pedidosService.getPedidoById(req.params.id)
    if (!pedido) {
        return res.status(404).json({ error: "El pedido no existe" });
    }
    if (pedido.estado !== "aceptado") {
        return res.status(400).json({ error: "El pedido no está en estado aceptado" });
    }
    try {
        await pedidosService.updatePedido(req.params.id, { estado: "en camino" });
        return res.status(200).json({ message: "Pedido en camino" });
    }
    catch (error) {
        return res.status(500).json({ error: "Algo falló" });
    }
};

const entregarPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "en camino"
            4. Si el pedido no está en estado "en camino", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "en camino", actualizar el estado del pedido a "entregado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const pedido = await pedidosService.getPedidoById(req.params.id)
    if (!pedido) {
        return res.status(404).json({ error: "El pedido no existe" });
    }
    if (pedido.estado !== "en camino") {
        return res.status(400).json({ error: "El pedido no está en estado en camino" });
    }
    try {
        await pedidosService.updatePedido(req.params.id, { estado: "entregado" });
        return res.status(200).json({ message: "Pedido entregado" });
    }
    catch (error) {
        return res.status(500).json({ error: "Algo falló" });
    }
};

const deletePedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
    const pedido = await pedidosService.getPedidoById(req.params.id)
    if (!pedido) {
        return res.status(404).json({ error: "El pedido no existe" });
    }
    try {
        await pedidosService.deletePedido(req.params.id);
        return res.status(200).json({ message: "Pedido eliminado" });
    }
    catch (error) {
        return res.status(500).json({ error: "Algo falló" });
    }
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
