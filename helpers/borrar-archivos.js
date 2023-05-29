const path = require('path')
const fs = require('fs')

const borrarArchivoCurso = async(curso) => {
    if(curso.nombreArchivo){
        const pathArchivo = path.join(__dirname,'../uploads/cursos', curso.nombreArchivo);
        if( fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

const borrarArchivoNormativa = async(nombreGrupo,item) => {
    if(item.nombreArchivo){
        const pathArchivo = path.join(__dirname,`../uploads/normativas/${nombreGrupo}`, item.nombreArchivo);
        if( fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

const borrarArchivoEvento = async(evento) => {
    if(evento.nombreArchivo){
        const pathArchivo = path.join(__dirname,'../uploads/eventos', evento.nombreArchivo);
        if(fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo);
            return true
        }
    }
    return false;
}

const borrarArchivoAlcalde = async(alcalde) => {
    if(alcalde.foto){
        const pathArchivo = path.join(__dirname,'../uploads/alcaldes',alcalde.foto);
        if(fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo);
            return  true;
        }
    }
    return false
}

const borrarPdfsMunicipio = async(municipio, nombre) => {
    if(municipio[nombre]){
        const pathArchivo = path.join(__dirname,`../uploads/municipios/${municipio.municipio}`, municipio[nombre])
        if(fs.existsSync(pathArchivo)){
            fs.unlinkSync(pathArchivo)
            return true;
        }
    }
    return false;
}
module.exports = {
    borrarArchivoNormativa,
    borrarArchivoCurso,
    borrarArchivoEvento,
    borrarArchivoAlcalde,
    borrarPdfsMunicipio
}