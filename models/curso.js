const { Schema, model } = require("mongoose");


const CursoSchema = Schema({
    titulo:{
        type: String,
        required: [true, 'El titulo del curso es obligatorio']
    },
    parrafo:{
        type: String,
        require: [true, 'El parrafo del curso es obligatorio']
    },
    nombreArchivo: {
        type: String,
    }
},{
    timestamps: true  
})


CursoSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Curso', CursoSchema)