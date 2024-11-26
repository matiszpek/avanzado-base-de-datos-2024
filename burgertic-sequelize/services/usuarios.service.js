import { Usuario } from "../models/usuarios.model.js";

const getUsuarioByEmail = async (email) => {
    const usuario = await Usuario.findOne({"where": {'email':email}});
    return usuario;
};

const getUsuarioById = async (id) => {
    const usuario = await Usuario.findOne({"where": {'id':id}});
    return usuario;
};

const createUsuario = async (usuario) => {
    return await Usuario.create(usuario);
};


export default { getUsuarioByEmail, getUsuarioById, createUsuario };
