const { Schema, model } = require("mongoose");

const archivoSchema = Schema({
    subtitle: {
        type: String
    },
    nombreArchivo:{
        type: String
    }

}) 

const NormativaSchema = Schema({
    titulo:{
        type: String,
        required: [true, 'El titulo de la normativa es obligatorio']
    },
    archivos: {
        type: [archivoSchema],
    }
})

NormativaSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Normativa', NormativaSchema)