const { Schema, model } = require("mongoose");


const RegionSchema = Schema({
    region:{
        type: String,
    },
    municipios: {
        type: [String],
    },
    edi:{
        type: String
    },
    mapa: Object
})


RegionSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Region', RegionSchema)