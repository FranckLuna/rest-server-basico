const express = require('express');
const cors = require('cors')


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        //middlerwares
        this.middlewares();

        //rutas de mi app
        this.routes();
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