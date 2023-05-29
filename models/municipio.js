const { Schema, model } = require("mongoose");

const MunicipioSchema = Schema({
    nro: String,
    region: String,
    municipio: String,
    mapa: Object,
    ptdi: String,
    poa: String,
    ine: String,
    presupuestaria: String,
    alcalde:{
        nombre: String,
        sigla: String,
        telefono: String,
        correo: String,
        direccion: String,
        foto: String
    },
    simred: {
        poblacion: {
            title: String,
            total: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            '0-3': {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            '4-5': {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            '6-19': {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            '20-39': {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            '40-59': {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            '60-y-mas': {
                subtitle: String,
                hombres: String,
                mujeres: String
            }
        },
        idioma: {
            title: String,
            total: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            castellano: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            quechua: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            aymara: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            guarani: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            otros: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            extranjeros: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            no_habla: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            sinespecificar: {
                subtitle: String,
                hombres: String,
                mujeres: String
            }
        },
        escolar: {
            title: String,
            total: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            asiste: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            noasiste: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            sinespecificar: {
                subtitle: String,
                hombres: String,
                mujeres: String
            }
        },
        salud: {
            title: String,
            caja: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            seguro_privado: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            salud_publico: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            salud_privado: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            tradicional: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            caseras: {
                subtitle: String,
                hombres: String,
                mujeres: String
            },
            farmacia: {
                subtitle: String,
                hombres: String,
                mujeres: String
            }
        },
        nacimiento: {
            title: String,
            lug_nacimiento: {
                total: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                aqui: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String    
                },
                otro_lugar: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String    
                },
                exterior: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String
                }
            },
            lug_residencia: {
                total: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String
                },
                aqui: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String
                },
                otro_lugar: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String
                },
                exterior: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String
                }
            }
        },
        economica: {
            title: String,
            act_economica: {
                total: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                agricultura: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                mineria: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                manufactura: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                servicios_basicos: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                construccion: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                comercio: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                otros: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                sin_especificar: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                incompletas: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                }
            },
            act_ocupacional: {
                total: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                obrero:{
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                hogar:{
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                cuenta_propia: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                socio: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                sin_renumeracion: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                cooperativa: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                },
                sin_especificar: {
                    subtitle: String,
                    hombres: String,
                    mujeres: String  
                }
            }
        },
        vivienda: {
            viviendas: {
                title: String,
                total: {
                    subtitle: String,
                    total: String 
                },
                vi_particulares: {
                    subtitle: String,
                    total: String
                },
                vi_colectivas: {
                    subtitle: String,
                    total: String
                },
                ocupadas: {
                    subtitle: String,
                    total: String 
                }
            },
            energia: {
                title: String,
                total: {
                    subtitle: String,
                    total: String
                },
                tiene: {
                    subtitle: String,
                    total: String
                },
                no_tiene: {
                    subtitle: String,
                    total: String
                }
            },
            cocinar: {
                title: String,
                total: {
                    subtitle: String,
                    total: String
                },
                gas: {
                    subtitle: String,
                    total: String
                },
                gas_cañeria: {
                    subtitle: String,
                    total: String
                },
                leña:{
                    subtitle: String,
                    total: String
                },
                otros: {
                    subtitle: String,
                    total: String
                },
                no_cocina: {
                    subtitle: String,
                    total: String
                }
            },
            agua: {
                title: String,
                total: {
                    subtitle: String,
                    total: String
                },
                canieria: {
                    subtitle: String,
                    total: String
                },
                pileta: {
                    subtitle: String,
                    total: String
                },
                carro: {
                    subtitle: String,
                    total: String
                },
                pozo: {
                    subtitle: String,
                    total: String
                },
                lluvia: {
                    subtitle: String,
                    total: String
                },
                otro: {
                    subtitle: String,
                    total: String
                }
            },
            desague: {
                title: String,
                total: {
                    subtitle: String,
                    total: String
                },
                alcantarillado: {
                    subtitle: String,
                    total: String
                },
                septica: {
                    subtitle: String,
                    total: String
                },
                ciego: {
                    subtitle: String,
                    total: String
                },
                calle: {
                    subtitle: String,
                    total: String
                },
                quebrada: {
                    subtitle: String,
                    total: String
                },
                lago: {
                    subtitle:String,
                    total: String
                }
            },
            basura: {
                title: String,
                total: {
                    subtitle: String,
                    total: String
                },
                publico: {
                    subtitle: String,
                    total: String
                },
                carro: {
                    subtitle: String,
                    total: String
                },
                calle: {
                    subtitle: String,
                    total: String
                },
                rio: {
                    subtitle: String,
                    total: String
                },
                queman: {
                    subtitle: String,
                    total: String
                },
                entierran: {
                    subtitle: String,
                    total: String
                },
                otra: {
                    subtitle: String,
                    total: String
                }
            },
            comunicacion: {
                title: String,
                radio: {
                    subtitle: String,
                    total: String
                },
                televisor: {
                    subtitle: String,
                    total: String
                },
                computadora: {
                    subtitle: String,
                    total: String
                },
                internet: {
                    subtitle: String,
                    total: String
                },
                telefonia: {
                    subtitle: String,
                    total: String
                }
            }
        }
    }
})  

MunicipioSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
}

module.exports = model('Municipio', MunicipioSchema)