const path = require('path')
const fs = require('fs')
const { subirArchivo, subirArchivoNombre } = require('./subir-archivo');


const actualizarArchivoCurso = async(req, modelo) => {
    if (!modelo || req.files == undefined){
        console.log(req.files)
        return false //mandamos false de que hay un fallo en el modelo, no se encontro
    }
    //limpiar imagenes previas
    if(modelo.nombreArchivo){
        //hay que borrar el archivo del servidor
        const pathArchivo = path.join(__dirname,'../uploads/cursos', modelo.nombreArchivo);
        if( fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
        }
    }
    const nombre = await subirArchivo(req.files, undefined, 'cursos')
    return nombre;
}

const actualizarArchivoEvento = async(req, modelo) => {
    if(!modelo || req.files == undefined){
        return false
    }
    if(modelo.nombreArchivo){
        const pathArchivo = path.join(__dirname,'../uploads/eventos', modelo.nombreArchivo);
        if(fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo);
        }
    }
    const nombre = await subirArchivo(req.files, undefined, 'eventos');
    return nombre;
}

const actualizarArchivoNormativa = async(req, grupo, item) => {
    if (req.files == undefined){
        return false //mandamos false de que hay un fallo en el modelo, no se encontro
    }

    const pathCarpeta = path.join(__dirname,'../uploads/normativas', grupo);
    if(!fs.existsSync(pathCarpeta)){
        fs.mkdirSync(pathCarpeta)
    }
    //limpiar los archivos previos
    if(item.nombreArchivo){
        const pathArchivo = path.join(__dirname,pathCarpeta, item.nombreArchivo);
        if( fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
        }
    }
    const nombre = await subirArchivoNombre(req.files, undefined, `normativas/${grupo}`, item.subtitle)
    return nombre;
}
const actualizarAchivoAlcalde = async(req, alcalde, municipioNombre) => {
    if(req.files == undefined){
        return false;
    }
    if(alcalde.foto){
        const pathArchivo = path.join(__dirname,'../uploads/alcaldes', alcalde.foto);       
        if(fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
        }
    }
    const nombre = await subirArchivoNombre(req.files, undefined, 'alcaldes', municipioNombre )
    return nombre
} 

const actualizarPdfsMunicipio = async(req, modelo,nombre) => {
    if(!modelo || req.files == undefined){
        return false
    }
    //verificamos si esta creado la carpeta
    const pathcarpeta = path.join(__dirname, '../uploads/municipios', modelo.municipio)
    if(!fs.existsSync(pathcarpeta)){
        fs.mkdirSync(pathcarpeta)
    }
    //verificamos is existe el archivo y lo limpieamos
    if(modelo[nombre]){
        const pathArchivo = path.join(pathcarpeta, modelo[nombre])
        if(fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
        }
    }
    const nuevoNombre = await subirArchivo(req.files, undefined, `municipios/${modelo.municipio}`)
    return nuevoNombre
}

const actualizarPdfRegion = async(req, modelo) => {
    if(!modelo || req.files == undefined){
        return false;
    }
    const pathCarpeta = path.join(__dirname, '../uploads/regiones', modelo.region);
    if(!fs.existsSync(pathCarpeta)){
        fs.mkdirSync(pathCarpeta);
    }
    if(modelo.edi){
        const pathArchivo = await path.join(pathCarpeta, modelo.edi);
        if(fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
        } 
    }
    const nuevoNombre = await subirArchivo(req.files, undefined, `regiones/${modelo.region}` )
    return nuevoNombre;
}

module.exports = {
    actualizarArchivoCurso,
    actualizarArchivoEvento,
    actualizarArchivoNormativa,
    actualizarAchivoAlcalde,
    actualizarPdfsMunicipio,
    actualizarPdfRegion
}

