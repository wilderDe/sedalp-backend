const { borrarArchivoNormativa } = require("../helpers/borrar-archivos");
const Normativa = require("../models/normativa")

const obtenerNormativas = async(req, res) => {
    const normativas = await Normativa.find();
    if(normativas){
        return res.json({
            ok:true,
            normativas
        })
    }else{
        return res.json({
            ok: false,
            msg: 'No hay normativas, comuniquese con el administrador urgente'
        });
    }
}

const crearNombreGrupoNormativa = async(req, res) => {
    const normativa =  new  Normativa(req.body);
    await normativa.save()
    res.json(normativa)
}

const actualizarNombreGrupoNormativa = async(req, res) => {
    const { id } = req.params;
    const normativa = await Normativa.findByIdAndUpdate(id, req.body)
    res.json({
        ok: true,
        msg: 'normativa actualizada'
    })
}

const eliminarGrupoNormativa = async(req, res) => {
    const { id } = req.params;
    const normativa = await Normativa.findById(id);
    //eliminar los archivos 
    const items = normativa.archivos.map(archivo => archivo)
    items.forEach(async (item)=> {
        await borrarArchivoNormativa(item)
    })

    await normativa.deleteOne();
    res.json({
        ok: true
    })
}

const crearItemGrupoNormativa = async(req, res) => {
    const { id } = req.params;
    const { subtitle } = req.body;
    const normativa = await Normativa.findById(id);
    if(!normativa){
        return res.status(400).json({
            ok:false,
            msg:'No existe el grupo con id enviado'
        })
    }
    normativa.archivos.push({subtitle})
    await normativa.save()
    res.json({
        ok: true,
        normativa
    })
}

const editarItemGrupoNormativa = async(req, res) => {
    const {idGrupo, idItem} = req.params
    const { subtitle } = req.body
    const normativa = await Normativa.findById(idGrupo);
    if(!normativa){
        return res.status(400).json({
            ok:false,
            msg:'No existe el grupo con id enviado'
        })
    }
    const itemExiste = normativa.archivos.find(archivo => archivo._id.toString() === idItem)
    if (itemExiste) {
        itemExiste.subtitle = subtitle
        normativa.save()
    } else {
        return res.status(400).json({
            ok:false,
            msg:'El archivo no existe erro en el _id'
        }) 
    }
    return res.json(normativa)
}

const eliminarItemGrupoNormatica = async(req, res) => {
    const {idGrupo, idItem} = req.params
    const normativa = await Normativa.findById(idGrupo);
    if(!normativa){
        return res.status(400).json({
            ok:false,
            msg:'No existe el grupo con id enviado'
        })
    }
    const itemExiste = normativa.archivos.find(archivo => archivo._id.toString() === idItem)
    if(itemExiste){
        normativa.archivos = normativa.archivos.filter(archivo => archivo._id.toString() !== idItem); 
        await normativa.save()
        return res.json({
            ok:true,
            msg: 'Item eliminado'
        })
    }
    res.json({
        ok: false,
        msg: 'No existe el item'
    })
}

module.exports = {
    obtenerNormativas,
    crearNombreGrupoNormativa,
    actualizarNombreGrupoNormativa,
    eliminarGrupoNormativa,

    crearItemGrupoNormativa,
    editarItemGrupoNormativa,
    eliminarItemGrupoNormatica
}