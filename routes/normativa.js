const { Router } = require("express");
const { crearNombreGrupoNormativa, actualizarNombreGrupoNormativa, crearItemGrupoNormativa, editarItemGrupoNormativa, obtenerNormativas, eliminarItemGrupoNormatica, eliminarGrupoNormativa } = require("../controllers/normativas");

const router = Router();

router.get('/', obtenerNormativas);
router.post('/', crearNombreGrupoNormativa);
router.put('/:id', actualizarNombreGrupoNormativa);
router.delete('/:id', eliminarGrupoNormativa);

router.post('/:id', crearItemGrupoNormativa);
router.put('/:idGrupo/:idItem', editarItemGrupoNormativa)
router.delete('/:idGrupo/:idItem', eliminarItemGrupoNormatica)

module.exports = router

