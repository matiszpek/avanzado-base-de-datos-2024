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
    
    const a= await Usuario.create(usuario);
    a.admin=false;
    await a.save();
    return a;
};


export default { getUsuarioByEmail, getUsuarioById, createUsuario };
