import { Usuario } from "../models/usuarios.model.js";

const getUsuarioByEmail = async (email) => {
    const usuario = await Usuario.findAll({"where": {'email':email}});
    if (!usuario) return null;
    return usuario;
};

const getUsuarioById = async (id) => {
    const usuario = await Usuario.findAll({"where": {'id':id}});
    if (!usuario) return null;
    return usuario;
};

const createUsuario = async (usuario) => {
    const newUsuario = await Usuario.create(
        {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,
            admin: usuario.admin,
        }
    );
    return newUsuario;
};

export default { getUsuarioByEmail, getUsuarioById, createUsuario };
