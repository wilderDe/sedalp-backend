const Municipio = require("../models/municipio")

const nuevoSimred = async(req,res) => {
    const {body} = req
    const municipio = new Municipio(body)
    await municipio.save()
    res.json({
        ok:true,
        municipio
    })
}

const obtenerMunicipio = async(req, res) => {
    const { nombre } = req.params
    const municipio = await Municipio.findOne({municipio: nombre})
    if(!municipio){
        return res.json({
            ok: false,
            msg: `No existe el municipio con el nombre ${nombre}`
        })
    }
    return res.json({
        ok : true,
        municipio
    })
}

const actualizarMunicipio = async(req, res) => {
    const { id } = req.params;
    const { body } = req
    const municipio = await Municipio.findById(id)
    if(!municipio){
        return res.json({
            ok: false,
            msg: `No existe el municipio con el nombre ${nombre}`
        })
    }
    await Municipio.findByIdAndUpdate(id, body)
   
    return res.json({
        ok: true,
        msg: 'Municipio actualizado',
    })
    
}

const actualizarAlcalde = async(req, res) => {
    const { id} = req.params
    const municipio = await Municipio.findById(id);
    if(municipio){
        //Viene {nombre, sigla, telefono, correom direccion }
        municipio.alcalde.nombre = req.body.nombre;
        municipio.alcalde.sigla = req.body.sigla;
        municipio.alcalde.telefono = req.body.telefono;
        municipio.alcalde.correo = req.body.correo;
        municipio.alcalde.direccion = req.body.direccion;
        
        await municipio.save()
        return res.json({
            ok: true,
            municipio,
            msg: "alcalde actualizado"
        })
    }
    return res.json({
        ok: false,
        msg: "No hay el municipio con el id ingresado"
    }) 
}
const actualizarMunicipioOne = async(req, res) => {
    const {id, objeto, propiedad} = req.params
    const municipio = await Municipio.findById(id)
    switch (objeto) {
        case 'poblacion':
            municipio.simred.poblacion[propiedad] = req.body
            await municipio.save()
            return res.json({ok:true})
        case 'idioma':
            municipio.simred.idioma[propiedad] = req.body
            await municipio.save()
            return res.json({ok:true})
        case 'escolar':
            municipio.simred.escolar[propiedad] = req.body
            await municipio.save()
            return res.json({ok:true})
        case 'salud':
            municipio.simred.salud[propiedad] = req.body
            await municipio.save()
            return res.json({ok:true})
        default:
            return res.json({
                ok: false,
                msg: 'Se me olvido validar esto'
            })
    }
}
const actualizarMunicipioTwo = async(req, res) => {
    const {id, objeto, subojeto, propiedad} = req.params
    const municipio = await Municipio.findById(id)
    switch (objeto) {
        case 'nacimiento':
            switch (subojeto) {
                case 'lug_nacimiento':
                    municipio.simred.nacimiento.lug_nacimiento[propiedad] = req.body
                    await municipio.save();
                    return res.json({ok: true})
                case 'lug_residencia':
                    municipio.simred.nacimiento.lug_residencia[propiedad] = req.body
                    await municipio.save();
                    return res.json({ok: true})
                default:
                    return res.json({
                        ok : false,
                        msg: 'Se me olvido validar esto'
                    })
            }
        case 'economica':
            switch (subojeto){
                case 'act_economica':
                    municipio.simred.economica.act_economica[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok: true})
                case 'act_ocupacional':
                    municipio.simred.economica.act_ocupacional[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok:true})
                default:
                    return res.json({
                        ok: false,
                        msg: 'Se me olvido validar esto'
                    })
            }
        case 'vivienda':
            switch (subojeto) {
                case 'viviendas':
                    municipio.simred.vivienda.viviendas[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok: true})
                case 'energia':
                    municipio.simred.vivienda.energia[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok: true})
                case 'cocinar':
                    municipio.simred.vivienda.cocinar[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok: true})
                case 'agua':
                    municipio.simred.vivienda.agua[propiedad] = req.body
                    await municipio.save()
                case 'desague':
                    municipio.simred.vivienda.desague[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok: true})
                case 'basura':
                    municipio.simred.vivienda.basura[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok: true})
                case 'comunicacion':
                    municipio.simred.vivienda.comunicacion[propiedad] = req.body
                    await municipio.save()
                    return res.json({ok: true})     
                default:
                    return res.json({
                        ok: false,
                        msg: 'Se me olvido validar esto'
                    })
            }
        default:
            return res.json({
                ok: fase,
                msg: 'Se me olvido validar esto'
            })
    }
}

module.exports = {
    nuevoSimred,
    obtenerMunicipio,
    actualizarMunicipio,
    actualizarMunicipioOne,
    actualizarMunicipioTwo,
    actualizarAlcalde
}