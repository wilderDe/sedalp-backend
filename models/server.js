const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios:   '/api/usuarios',
            eventos:    '/api/eventos',
            cursos:     '/api/cursos',
            normativa:  '/api/normativa',
            municipios: '/api/municipios',
            regiones:   '/api/regiones',
            uploads:    '/api/uploads',
        }

        //Conectar a base de datos
        this.conectarDB()

        //middlewares
        this.middlewares()
        
        //rutas de la aplicacion
        this.routes()
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use( express.json({limit: '600mb'}) );

        //Directorio publico
        this.app.use( express.static('public'));

        //Fileupload - cargar archivos
      
        this.app.use(fileUpload())
    }

    routes(){
        this.app.use(this.paths.usuarios, require('../routes/usuario'))
        this.app.use( this.paths.eventos, require('../routes/eventos') )
        this.app.use(this.paths.cursos, require('../routes/cursos'))
        this.app.use(this.paths.normativa, require('../routes/normativa'))
        this.app.use(this.paths.municipios, require('../routes/municipios'))
        this.app.use(this.paths.regiones, require('../routes/region'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ', this.port)
        })
    }

}

module.exports = Server;