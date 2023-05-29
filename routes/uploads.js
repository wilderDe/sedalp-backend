const { Router } = require("express");
const { cargarArchivoCurso, mostrarArchivoCusro, cargarArchivoNormativa, eliminarArchivoNormativa, mostrarArchivoNormativa, eliminarArchivoCurso, cargarArchivoEvento, mostrarArchivoEvento, eliminarArchivoEvento, cargarArchivoAlcalde, mostrarArchivoAlcalde, eliminarArchivoAlcalde, cargarPdfsMunicipio, mostrarPdfsMunicipio, eliminarArchivoPfds, cargarPdfRegion, mostrarPdfRegion } = require("../controllers/uploads");

const router = Router();

router.put('/cursos/:id', cargarArchivoCurso);
router.get('/cursos/:id', mostrarArchivoCusro);
router.delete('/cursos/:id', eliminarArchivoCurso)

router.get('/normativa/:idGrupo/:idItem', mostrarArchivoNormativa);
router.put('/normativa/:idGrupo/:idItem', cargarArchivoNormativa);
router.delete('/normativa/:idGrupo/:idItem', eliminarArchivoNormativa);


router.put('/evento/:id', cargarArchivoEvento);
router.get('/evento/:id', mostrarArchivoEvento);
router.delete('/evento/:id', eliminarArchivoEvento);

router.put('/alcalde/:id', cargarArchivoAlcalde);
router.get('/alcalde/:id', mostrarArchivoAlcalde);
router.delete('/alcalde/:id', eliminarArchivoAlcalde)

router.put('/pdfs/:nombre/:id', cargarPdfsMunicipio);
router.get('/pdfs/:nombre/:id', mostrarPdfsMunicipio)
router.delete('/pdfs/:nombre/:id', eliminarArchivoPfds)

router.put('/edi/:id', cargarPdfRegion) 
router.get('/edi/:id', mostrarPdfRegion)

module.exports = router;