const { borrarArchivoCurso } = require("../helpers/borrar-archivos")
const Curso = require("../models/curso")

const obtenerCursos = async(req, res) => {
    const cursos = await Curso.find()
    if(cursos){
        return res.json({
            ok: true,
            cursos
        })
    }
    return res.json({
        ok:false,
        msg:'No hay cursos, comuniquese con el administrador urgente'
    })
    
}
const crearCurso = async (req, res) => {
    const curso = new Curso(req.body)
    await curso.save();
    return res.status(201).json(curso)
}
const actualizarCurso = async(req, res) => {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    if(curso){
        await Curso.findByIdAndUpdate(id, req.body)
        return res.json({
            ok: true,
            msg: 'Curso actualizado',
        })
    }
    return res.json({
        ok: false,
        msg: 'No existe el curso con el id ingresado',
    })
    
}
const eliminarCurso = async(req, res) => {
    const { id } = req.params;
    const curso = await Curso.findById(id);
    if(!curso){
        return res.json({
            ok: false,
            msg: 'No existe con el curso con el id ingresado'
        })
    }   
    if(curso.nombreArchivo){
        await borrarArchivoCurso(curso);
    }
    await curso.deleteOne();
    return res.json({
        ok: true,
        msg: "Curso eliminado"
    })
}

module.exports = {
    obtenerCursos,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}
