const { Router } = require("express");
const { obtenerUsuarios, nuevoUsuario, AcualizarUsuario, UsuarioIdEdit, EliminarUsuario, validarUsuario } = require("../controllers/usuarios");


const router = Router();

router.post('/auth', validarUsuario);
router.get('/', obtenerUsuarios);
router.post('/', nuevoUsuario);
router.put('/:id', AcualizarUsuario);
router.put('/user/:id', UsuarioIdEdit);
router.delete('/:id', EliminarUsuario);

module.exports = router;