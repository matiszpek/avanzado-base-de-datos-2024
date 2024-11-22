import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;
import { Usuario } from "../models/usuarios.model.js";

const getUsuarioByEmail = async (email) => {
    const client = new Client(config);
    await client.connect();

    try {
       /*  const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );
        if (rows.length < 1) return null; */
        const {rows}= await Usuario.findAll({"where": {'email':email}});

        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getUsuarioById = async (id) => {
    const client = new Client(config);
    await client.connect();

    try {
/*         const { rows } = await client.query(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        ); */
        const {rows}= await Usuario.findAll({"where": {'id':id}});

        if (rows.length < 1) return null;

        await client.end();
        return rows[0];
    } catch (error) {
        await client.end();
        throw error;
    }
};

const createUsuario = async (usuario) => {
    const client = new Client(config);
    await client.connect();

    try {
/*         const { rows } = await client.query(
            "INSERT INTO usuarios (nombre, apellido, email, password, admin) VALUES ($1, $2, $3, $4, false)",
            [usuario.nombre, usuario.apellido, usuario.email, usuario.password]
        ); */
        const {rows}= await Usuario.create({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            password: usuario.password,
            admin: false,
        });

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

export default { getUsuarioByEmail, getUsuarioById, createUsuario };
