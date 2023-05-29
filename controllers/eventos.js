const { borrarArchivoEvento } = require("../helpers/borrar-archivos");
const Evento = require("../models/evento")


const obtenerEventos = async(req, res) => {
    const eventos = await Evento.find();
    if(eventos){
        return res.json({
            ok: true,
            eventos
        })
    }
    return res.json({
        ok: false,
        msg: 'No hay cursos, comuniquese con el administrador urgente'    
    })
}

const crearEvento = async (req, res) => {
    const evento = new Evento(req.body);
    await evento.save();
    return res.status(201).json(evento)
}

const actualizarEvento = async(req, res) => {
    const { id } = req.params;
    const evento = await Evento.findById(id);
    if(evento){
        await Evento.findByIdAndUpdate(id, req.body);
        return res.json({
            ok: true,
            msg: 'Evento actualizado'
        })
    }
    return res.json({
        ok: false,
        msg: 'No existe el curso con el id ingresado'
    })
}

const eliminarEvento = async(req, res) => {
    const { id } = req.params;
    const evento = await Evento.findById(id);
    if(!evento){
        return res.json({
            ok: false,
            smg:'No existe el evento con el id ingresado'
        })
    }
    if(evento.nombreArchivo){
        await borrarArchivoEvento(evento);
    }
    await evento.deleteOne();
    res.json({
        ok: true,
        msg: 'Evento eliminado'
    })
}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
