const { Router } = require("express");
const { nuevoSimred, actualizarMunicipioOne, actualizarMunicipioTwo, actualizarAlcalde, obtenerMunicipio, actualizarMunicipio } = require("../controllers/municipios");


const router = Router();

router.get('/:nombre', obtenerMunicipio)
router.post('/', nuevoSimred)
router.put('/:id', actualizarMunicipio)
router.put('/alcalde/:id', actualizarAlcalde)
router.put('/:id/:objeto/:propiedad', actualizarMunicipioOne),
router.put('/:id/:objeto/:subojeto/:propiedad', actualizarMunicipioTwo)

module.exports = router