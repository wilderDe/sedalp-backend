const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    nombreApellido: String,
    telefono: String,
    usuario: String,
    contrasenia: String,
    estado: Boolean,
    rol: String
},{
    timestamps: true  
})


UsuarioSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Usuario', UsuarioSchema)