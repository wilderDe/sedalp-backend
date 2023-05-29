const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { obtenerCursos, crearCurso, actualizarCurso, eliminarCurso } = require("../controllers/cursos");

const router = Router();

//Obtener todos los eventos
router.get('/', obtenerCursos);

//Crear un evento
router.post('/', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('parrafo','El parrafo es obligatorio').not().isEmpty(),
    validarCampos
], crearCurso )

//Actualizar un evento segun el id
router.put('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos
], actualizarCurso)

//Borrar un evento 
router.delete('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos
], eliminarCurso)

module.exports = router;