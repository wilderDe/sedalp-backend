const path = require('path')
const fs = require('fs')
const { response, request, json } = require("express");
const Normativa = require('../models/normativa');
const Curso = require("../models/curso");
const Evento = require('../models/evento');
const Municipio = require('../models/municipio');
const Region = require('../models/region');
const { actualizarArchivoCurso, actualizarArchivoNormativa, actualizarArchivoEvento, actualizarAchivoAlcalde, actualizarPdfsMunicipio, actualizarPdfRegion } = require('../helpers/actualizar-archivo');
const { borrarArchivoNormativa, borrarArchivoCurso, borrarArchivoEvento, borrarArchivoAlcalde, borrarPdfsMunicipio } = require('../helpers/borrar-archivos');



/********************  CURSOS *********************/
const cargarArchivoCurso = async(req=request, res=response) => {
    const { id }  = req.params; 
    const modelo = await Curso.findById(id);
    const nuevoNombre = await actualizarArchivoCurso(req, modelo)
    if(!!nuevoNombre) {
        modelo.nombreArchivo = nuevoNombre;
        await modelo.save();
        return res.json({
            ok: true,
            msg:"se actualizo el archivo"
        })
    }
    return res.json({
        ok: false,
        msg: 'El id o el archivo no son correctos, undefined'
    }) 
}
const mostrarArchivoCusro = async(req=request, res=response)=>{
    const {id} = req.params;
    const modelo = await Curso.findById(id);
    if(!modelo){
        return res.status(400).json({
            ok: false,
            msg: `No existe un curso con el id ${id}`
        })
    }
    //verificamos el archivo
    if(modelo.nombreArchivo){
        const pathArchivo = path.join(__dirname, '../uploads/cursos', modelo.nombreArchivo)
        if(fs.existsSync(pathArchivo)){
            return res.sendFile(pathArchivo)
        }
    }
    //En caso de que no contenga ningun archivo
    const pathArchivo = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathArchivo)
}
const eliminarArchivoCurso = async(req, res) => {
    const { id } = req.params
    const modelo = await Curso.findById(id);
    if(!modelo){
        return res.json({
            ok:false,
            msg:'No existe el curso con el id ingresado'
        })
    }
    if(modelo.nombreArchivo){
        const archivoBorrado = await borrarArchivoCurso(modelo);
        if(archivoBorrado){
            modelo.nombreArchivo = '';
            modelo.save();
            return res.json({
                ok: true,
                msg: "Archivo del curso borrado"
            })
        }
    }
    return res.json({
        ok: false,
        msg: "El archivo no existe"
    })
}

/********************  NORMATIVAS *********************/
const cargarArchivoNormativa = async(req,res) => {
    const {idGrupo, idItem} = req.params;
    const modelo = await Normativa.findById(idGrupo);
    if(!modelo){
        return res.status(400).json({
            ok:false,
            msg:'No existe el grupo con id enviado'
        })
    }
    const itemExiste = modelo.archivos.find(archivo => archivo._id.toString() === idItem)
    if (itemExiste) {
        const nuevoNombre = await actualizarArchivoNormativa(req, modelo.titulo, itemExiste);
        itemExiste.nombreArchivo = nuevoNombre;
        await modelo.save()

        return res.json({
            ok:true,
            modelo
        })
    } 
    return res.status(400).json({
        ok:false,
        msg:'El archivo no existe error en el _id'
    }) 
    
}
const eliminarArchivoNormativa = async(req, res) => {
    const {idGrupo, idItem} = req.params;
    const modelo = await Normativa.findById(idGrupo);
    if(!modelo){
        return res.status(400).json({
            ok:false,
            msg:'No existe el grupo con id enviado'
        })
    }
    const itemExiste = modelo.archivos.find(archivo => archivo._id.toString() === idItem)
    if (itemExiste) {
        const archivoBorrado = await borrarArchivoNormativa(modelo.titulo,itemExiste);
        if(archivoBorrado){
            itemExiste.nombreArchivo = '';
            modelo.save();
            return res.json({
                ok:true,
                modelo
            })
        }else{
            return res.json({
                ok:false,
                msg:'El archivo no existe comuniquese con el administrador'
            })
        } 
    } 
    return res.status(400).json({
        ok:false,
        msg:'El archivo no existe error en el _id'
    }) 
    
}
const mostrarArchivoNormativa = async(req, res) => {
    const {idGrupo, idItem} = req.params;
    let pathArchivo;
    const modelo = await Normativa.findById(idGrupo);
    if(!modelo){
        return res.status(400).json({
            ok:false,
            msg:'No existe el grupo con id enviado'
        })
    }
    const itemExiste = modelo.archivos.find(archivo => archivo._id.toString() === idItem)
    if(itemExiste.nombreArchivo){
        pathArchivo = path.join(__dirname, '../uploads/normativas', modelo.titulo ,itemExiste.nombreArchivo)
        if(fs.existsSync(pathArchivo)){
            return res.sendFile(pathArchivo)
        }
    }
    //En caso de que no contenga ningun archivo
    pathArchivo = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathArchivo)  
}

/********************** EVENTOS *************************/
const cargarArchivoEvento = async(req=request, res=response) => {
    const { id }  = req.params; 
    const modelo = await Evento.findById(id);
    const nuevoNombre = await actualizarArchivoEvento(req, modelo)
    if(!!nuevoNombre) {
        modelo.nombreArchivo = nuevoNombre;
        await modelo.save();
        return res.json({
            ok: true,
            msg:"se actualizo el archivo"
        })
    }
    return res.json({
        ok: false,
        msg: 'El id o el archivo no son correctos, undefined'
    })
}
const mostrarArchivoEvento = async(req, res) => {
    const { id } = req.params;
    const modelo = await Evento.findById(id);
    if(!modelo){
        return res.status(400).json({
            ok: false,
            msg: 'No existe el evento con el id ingresado'
        })
    }
    if(modelo.nombreArchivo){
        const pathArchivo = path.join(__dirname, '../uploads/eventos', modelo.nombreArchivo);
        if(fs.existsSync(pathArchivo)){
            return res.sendFile(pathArchivo)
        }
    }
    //En caso de que no contenga ningun archivo
    const pathArchivo = path.join(__dirname,'../assets/no-image.jpg');
    return res.sendFile(pathArchivo)
}
const eliminarArchivoEvento = async(req, res) => {
    const { id } = req.params;
    const modelo = await Evento.findById(id);
    if(!modelo){
        return res.status(400).json({
            ok: false,
            msg: 'No existe el evento con el id ingresado'
        })
    }
    if(modelo.nombreArchivo){
        const archivoBorrado = await borrarArchivoEvento(modelo);
        if(archivoBorrado){
            modelo.nombreArchivo = '';
            modelo.save();
            return res.json({
                ok: true,
                msg: 'archivo elimindao'
            })
        }
    }
    return res.json({
        ok: false,
        msg: 'El archivo no existe'
    })
}

/******************** ALCALDE *********************/
const cargarArchivoAlcalde = async(req, res)=>{
    const {id} = req.params;
    const modelo = await Municipio.findById(id) 
    const nuevoNombre = await actualizarAchivoAlcalde(req, modelo.alcalde, modelo.municipio)
    if(!!nuevoNombre){
        modelo.alcalde.foto = nuevoNombre;
        await modelo.save();
        return res.json({
            ok: true,
            msg: 'Se actualizo el archivo'
        })
    }
    return res.json({
        ok: false,
        msg: 'El id o el archivo no son correctos, undefined'
    })
}
const mostrarArchivoAlcalde = async(req, res) => {
    const {id} = req.params;
    const modelo = await Municipio.findById(id);
    if(!modelo){
        return res.status(400).json({
            ok: false,
            msg: `No existe un curso con el id ${id}`
        })
    }
    //verificamos el archivo
    if(modelo.alcalde.foto){
        const pathArchivo = path.join(__dirname, '../uploads/alcaldes', modelo.alcalde.foto)
        if(fs.existsSync(pathArchivo)){
            return res.sendFile(pathArchivo)
        }
    }
    //En caso de que no contenga ningun archivo
    const pathArchivo = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathArchivo)
}
const eliminarArchivoAlcalde = async(req, res) => {
    const { id } = req.params
    const modelo = await Municipio.findById(id);
    if(!modelo){
        return res.json({
            ok:false,
            msg:'No existe el curso con el id ingresado'
        })
    }
    if(modelo.alcalde.foto){
        const archivoBorrado = await borrarArchivoAlcalde(modelo.alcalde);
        if(archivoBorrado){
            modelo.alcalde.foto = '';
            modelo.save();
            return res.json({
                ok: true,
                msg: "Archivo del alcalde borrado"
            })
        }
    }
    return res.json({
        ok: false,
        msg: "El archivo no existe"
    })
}

/********************* PDFS poa-ine-pti- ejecutiva *********/
const cargarPdfsMunicipio = async(req, res) =>{
    const {id, nombre} = req.params;
    const modelo = await Municipio.findById(id);
    const nuevoNombre = await actualizarPdfsMunicipio(req, modelo, nombre)
    if(!!nuevoNombre){
        modelo[nombre] = nuevoNombre;
        await modelo.save();
        return res.json({
            ok: true,
            msg: 'Se actualizo el archivo'
        })
    }
    res.json({
        ok: false,
        msg:'Fallo al cargar comuniquese con el administrador'
    })
}
const mostrarPdfsMunicipio = async(req, res) => {
    const {id, nombre} = req.params;
    const modelo = await Municipio.findById(id)
    if(!modelo){
        return res.status(400).json({
            ok: false,
            msg: `No existe un curso con el id ${id}`
        })
    }
    //verificamos el archivo
    if(modelo[nombre]){
        const pathArchivo = path.join(__dirname, `../uploads/municipios/${modelo.municipio}`, modelo[nombre])
        if(fs.existsSync(pathArchivo)){
            return res.sendFile(pathArchivo)
        }
    }
    //En caso de que no contenga ningun archivo
    const pathArchivo = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathArchivo)
}
const eliminarArchivoPfds = async(req, res) => {
    const {id, nombre} = req.params;
    const modelo = await Municipio.findById(id)
    if(!modelo){
        return res.status(400).json({
            ok: false,
            msg: `No existe un curso con el id ${id}`
        })
    }
    if(modelo[nombre]){
       const archivoBorrado = await borrarPdfsMunicipio(modelo, nombre)
       if(archivoBorrado){
        modelo[nombre] = '';
        modelo.save();
        return res.json({
            ok: true,
            msg: 'Pdf borrado'
        })
       }
    }
    return res.json({
        ok: false,
        msg: "El archivo no existe"
    })
}
/**************** EDI - regiones ***********/

const cargarPdfRegion = async(req, res) => {
    const { id }  = req.params
    const modelo = await Region.findById(id);
    if(!modelo){
        return res.json({
            ok: false,
            msg: 'el id de la region es incorrecto'
        })
    }
    const nuevoNombre = await actualizarPdfRegion(req, modelo);
    if(!!nuevoNombre){
        modelo.edi = nuevoNombre;
        await modelo.save();
        return res.json({
            ok : true,
            msg: 'Se actualizo el archivo'
        })
    }
    return res.json({
        ok: true,
        msg: 'Fallo con el id o el archivo'
    })
}

const mostrarPdfRegion = async(req, res) => {
    const { id } = req.params;
    const modelo = await Region.findById(id);
    if(!modelo){
        return res.status(400).json({
            ok: false,
            msg: `No existe una region con el id ${id}`
        })
    }
    // verificamos el archivo
    if(modelo.edi){
        const pathArchivo = path.join(__dirname, `../uploads/regiones/${modelo.region}`, modelo.edi)
        if(fs.existsSync(pathArchivo)){
            return res.sendFile(pathArchivo)
        }
    }
    //En casopo de que no contenga ningun archivo
    const pathArchivo = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathArchivo);
}

module.exports = {
    cargarArchivoCurso,
    mostrarArchivoCusro,
    eliminarArchivoCurso,

    cargarArchivoNormativa,
    eliminarArchivoNormativa,
    mostrarArchivoNormativa,

    cargarArchivoEvento,
    mostrarArchivoEvento,
    eliminarArchivoEvento,

    cargarArchivoAlcalde,
    mostrarArchivoAlcalde,
    eliminarArchivoAlcalde,

    cargarPdfsMunicipio,
    mostrarPdfsMunicipio,
    eliminarArchivoPfds,

    cargarPdfRegion,
    mostrarPdfRegion
}