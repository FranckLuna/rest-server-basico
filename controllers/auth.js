const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async(req, res = response)=>{
    const { correo, password } = req.body; //recibimos el correo y el password del body
    try {
        //verificar el mail
        const usuario = await Usuario.findOne({correo}); //metodo de mongoose
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - correo'
            });
        };
        //si el usuario esta activo, estado: true
        if( !usuario.estado ){ //si estado es distinto a true
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - estado: false'
            });
        };
        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync( password, usuario.password ); //metodo de bcryptjs
        if( !validarPassword ){
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - password'
            });
        };

        //generar el JWT
        const token = await generarJWT( usuario.id ); //llamamos al metodo si todo va bien
        //regramos solo lo que queremos ver en el objeto
        res.json({
            usuario,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    };
};

module.exports ={
    login
}