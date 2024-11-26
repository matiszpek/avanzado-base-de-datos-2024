import { Plato } from "../models/platos.model.js";

const getPlatos = async () => {
    return await Plato.findAll();
};
const getPlatoById = async (id) =>{

    const plato = await Plato.findOne( {"where": {'id':id}});
    if (!plato) throw new Error("Plato no encontrado");
    return plato;
}
    

const createPlato = async (plato) => {
    return await Plato.create(plato);
};
    
const updatePlato = async (id, newData) => {
    const plato = await Plato.findOne( {"where": {'id':id}});
    if (!plato) throw new Error("Plato no encontrado");

    await plato.update(newData);
    return plato;
};

const deletePlato = async (id) => {
    const plato = await Plato.findOne( {"where": {'id':id}});
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
