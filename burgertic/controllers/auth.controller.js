import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */

    const { usuario } = req.body;
    if (!usuario) {
        return res.status(400).json({ error: "Falta el campo usuario" });
    }

    const { nombre, apellido, email, password } = usuario;
    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);
    if (usuarioExistente) {
        return res.status(400).json({ error: "El email ya está registrado" });
    }

    const salt = bcrypt.genSaltSync(11);
    const hash = bcrypt.hashSync(password, salt);
    const nuevoUsuario = {
        nombre,
        apellido,
        email,
        password: hash,
    };

    try {
        await UsuariosService.createUsuario(nuevoUsuario);
        return res.status(201).json({ mensaje: "Usuario creado con éxito" });
    } catch (error) {
        return res.status(500).json({ error: "Error al crear el usuario" });
    }
};

const login = async (req, res) => {
    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const usuarioExistente = await UsuariosService.getUsuarioByEmail(email);
    if (!usuarioExistente) {
        return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const passwordCorrecto = bcrypt.compareSync(password, usuarioExistente.password);
    if (!passwordCorrecto) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: usuarioExistente.id }, process.env.JWT_SECRET);
    return res.status(200).json({ usuario: usuarioExistente, token });
};

export default { register, login };
