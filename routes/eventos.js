const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/eventos");

const router = Router();

//Obtener todos los eventos
router.get('/', obtenerEventos);

//Crear un evento
router.post('/', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    check('resumen','El resumen es obligatorio').not().isEmpty(),
    check('descripcion','La descripcion es obligatorio').not().isEmpty(),
    check('fecha','La fecha es obligatorio').not().isEmpty(),
    validarCampos
], crearEvento )

//Actualizar un evento segun el id
router.put('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos
], actualizarEvento)

//Borrar un evento 
router.delete('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),
    validarCampos
], eliminarEvento)

module.exports = router;