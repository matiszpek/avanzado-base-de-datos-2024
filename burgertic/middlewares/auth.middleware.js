import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar si hay un token en los headers de autorización
            2. Verificar que el token esté en el formato correcto (Bearer <token>)
            3. Verificar que el token sea válido (utilizando la librería jsonwebtoken)
            4. Verificar que tenga un id de usuario al decodificarlo
    
        Recordar también que si sucede cualquier error en este proceso, deben devolver un error 401 (Unauthorized)
    */
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Falta el token de autorización" });
    }
    if (!req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Formato de token inválido" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.idUsuario = id;
        next();
    } catch (error) {
        console.log("bbbb");
        console.log(error.message);
        console.log(process.env.JWT_SECRET);
        return res.status(401).json({ error: "Token inválido" });
    }
    if (!req.idUsuario) {
        console.log("aaa");
        return res.status(401).json({ error: "Token inválido" });
    }
    
};

export const verifyAdmin = async (req, res, next) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el id de usuario en la request es un administrador (utilizando el servicio de usuarios)
            2. Si no lo es, devolver un error 403 (Forbidden)
    
    */
    const usuario = await UsuariosService.getUsuarioById(req.idUsuario);
    if (!usuario || !usuario.admin) {
        return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
};
