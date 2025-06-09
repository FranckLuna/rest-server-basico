const express = require('express');
const cors = require('cors')
const { dbConection } = require('../database/config')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';

        //conectar a la bd
        this.conectarDb();

        //middlerwares
        this.middlewares();

        //rutas de mi app
        this.routes();
    };
    
    async conectarDb(){
        await dbConection();
    };

    middlewares(){
        //cors
        this.app.use( cors() );
        //lectura y parseo del body
        this.app.use( express.json() );
        //directorio publico
        this.app.use( express.static('public') );
    }

//es importante que nuestros servicios siempre retornen un codigo de respuesta dependiendo de lo que suc
    routes(){
       this.app.use( this.usuarioPath, require('../routes/usuarios') );
    };

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;