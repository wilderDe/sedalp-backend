const { Router } = require("express");
const { obtenerRegion, actualizarRegion, obtenerRegiones } = require("../controllers/region");


const router = Router();

router.get('/', obtenerRegiones)
router.get('/:nombre', obtenerRegion)
router.put('/:id', actualizarRegion)

module.exports = router