const { Schema, model } = require("mongoose");


const EventoSchema = Schema({
    titulo:{
        type: String,
        required: [true, 'El titulo del evento es obligatorio']
    },
    resumen:{
        type: String,
        require: [true, 'El resumen del evento es obligatorio']
    },
    descripcion:{
        type: String,
        require: [true, 'La descripcion del evento es necesario']
    },
    fecha: {
        type: Date,
        require: [true, 'La fecha del evento es obligatorio']
    },
    nombreArchivo: {
        type: String 
    }
})

EventoSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Evento', EventoSchema)