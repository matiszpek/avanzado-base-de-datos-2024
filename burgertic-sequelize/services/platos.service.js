import { Plato } from "../models/platos.model.js";

const getPlatos = async () => await Plato.findAll();

const getPlatoById = async (id) =>{

    const plato = await Plato.findAll( {"where": {'id':id}});
    if (!plato) throw new Error("Plato no encontrado");
    return plato;
}
    

const createPlato = async (plato) =>{
    const newPlato = await Plato.create(
        {
            tipo: plato.tipo,
            nombre: plato.nombre,
            precio: plato.precio,
            descripcion: plato.descripcion,
        }
    );
    return newPlato;
}
    
const updatePlato = async (id, newData) => {
    const plato = await Plato.findAll( {"where": {'id':id}});
    if (!plato) throw new Error("Plato no encontrado");

    plato.tipo = newData.tipo;
    plato.nombre = newData.nombre;
    plato.precio = newData.precio;
    plato.descripcion = newData.descripcion;

    await plato.save();
};

const deletePlato = async (id) => {
    const plato = await Plato.findAll( {"where": {'id':id}});
    if (!plato) throw new Error("Plato no encontrado");

    await plato.destroy();
};

const getPlatosByTipo = async (tipo) =>{
    const platos = await Plato.findAll( {"where": {'tipo':tipo}});
    if (!platos) throw new Error("Plato no encontrado");
    return platos;
}
    

export default {
    getPlatos,
    getPlatoById,
    createPlato,
    updatePlato,
    deletePlato,
    getPlatosByTipo,
};
