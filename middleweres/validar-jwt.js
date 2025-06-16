const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next) =>{
    const token = req.header('x-token'); //traemos el token del header
    //verificar si viene el token en el header
    if( !token ){ 
        return res.status(400).json({
            msg: 'No hay token en la peticion'
        });
    };

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //verificamos si el token es un token valido (header-payload-firma)
        //verificar que el usuario existe en la db
        const usuario = await Usuario.findById( uid );
        if(!usuario){
            return res.status(401).json({
                msg: "Token no valido - Usuario no existe en DB"
            });
        };
        
        //validar usuario estado: true
        if( !usuario.estado ){
            return res.status(401).json({
                msg: "Token no valido - Usuario con estado false"
            });
        };

        req.usuario = usuario;

        //req.uid = uid; //mandamos el uid 
        next(); //si todo va bien avanzamos
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token invalido'
        });
    };
};

module.exports = {
    validarJWT
}