import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

router.get("/", verifyToken, verifyAdmin, PedidosController.listar);
router.get("/:id", verifyToken, PedidosController.detalle);
router.post("/", verifyToken, PedidosController.crear);
router.put("/:id", verifyToken, PedidosController.actualizar);
router.delete("/:id", verifyToken, PedidosController.eliminar);

export default router;
