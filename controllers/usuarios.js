const Usuario = require("../models/usuario")

const validarUsuario = async(req, res) => {
    const {usuario, contrasenia} = req.body

    try {
        const user = await Usuario.findOne({usuario, contrasenia});
        if(!user){
            return res.json({
                ok : false,
                msg: 'Usuario y Contraseña son incorrectos'
            })
        }
        return res.json({
            ok: true,
            user
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const obtenerUsuarios = async(req, res) => {
    const usuarios = await Usuario.find()
    if(!usuarios){
        return res.json({
            ok: false,
            msg:'No hay usuarios, comuniquese con el administrador urgente'
        })
    }
    return res.json({
        ok : true,
        usuarios
    })
}

const nuevoUsuario = async(req, res) => {
    //nombreapellido, email, telefono
    const {nombreApellido, telefono, rol, estado, usuario, contrasenia} = req.body;
    const usr = new Usuario({nombreApellido, telefono, usuario, contrasenia, rol, estado});
    /*const salt = bcryptjs.genSaltSync();
    usuario.contrasenia = bcryptjs.hashSync(contrasenia, salt);*/
    await usr.save();
    return res.json(usr)
}

//El usuario puede editar su contrasenia
const UsuarioIdEdit = async(req, res) => {
    const {id} = req.params;
   
    const user = await Usuario.findByIdAndUpdate(id, req.body);
    return res.json({
        ok: true,
        msg: "Contraseña modificada"
    })
}

//El usuario rol admin actualiza al usuario
const AcualizarUsuario = async (req, res) => {
    const {id} = req.params;
    const user = await Usuario.findByIdAndUpdate(id, req.body);
    return res.json({
        ok: true,
        msg: 'Se modico el usuario'
    })
}

const EliminarUsuario = async(req, res) => {
    const {id} = req.params;
    const user = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        ok: true,
        msg: 'Se elimino el usuario'
    })
}

module.exports = {
    validarUsuario,
    obtenerUsuarios,
    nuevoUsuario,
    AcualizarUsuario,
    EliminarUsuario,
    UsuarioIdEdit
}