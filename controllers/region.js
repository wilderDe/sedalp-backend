const Region = require("../models/region")


const obtenerRegiones = async(req, res) => {
    const region = await Region.find();

    if(!region){
        return res.json({
            ok : false,
            msg: "no hay regiones"
        })
    }

    return res.json({
        ok: true,
        region
    })
}

const obtenerRegion = async(req, res) => {
    const { nombre } = req.params
    const region = await Region.findOne({region: nombre})
    if(!region){
        return res.json({
            ok: false,
            msg: 'No hay una region con el id proporcionado'
        })
    }
    return res.json({
        ok : true,
        region
    })
}

const actualizarRegion = async(req ,res) => {
    const { id } = req.params
    const {body} = req
    const region = await Region.findById(id);
    if(!region){
        return res.json({
            ok: false,
            msg: 'No hay una region con el id proporcionado'
        })
    } 

    await Region.findByIdAndUpdate(id, body)
    return res.json({
        ok: true,
        msg: "Region actualizado"
    })
}


module.exports = {
    obtenerRegiones,
    obtenerRegion,
    actualizarRegion
}