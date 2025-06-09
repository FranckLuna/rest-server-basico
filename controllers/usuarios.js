const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet =  async(req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
// arreglo de promesas
    const [total, usuarios] = await Promise.all([ // si una promesa da error todas dan error
        Usuario.countDocuments(query),
         Usuario.find(query)
                    .skip( Number(desde)) // debemos validar que ingrese un numero
                    .limit( Number(limite)) //argumento para regresar solo 2 registros
    ]);
    //cuerpo del objeto
    res.json({ total, usuarios })
};

const usuariosPost = async( req, res = response ) => {
    //destructurar lo que se necesita
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol });
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );
    //guardar en bd
    await usuario.save();
    //cuerpo del objeto
    res.json({
        usuario
    });
};

const usuariosPut = async( req, res = response ) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body; //omito pass goo correo
    // validar contra en base de datos 
    if( password ){ //siviene es porque hay que actualizar
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto ); //metodo de mongoose
    //cuerpo del objeto
    res.json({
        msg: 'Usuario modificado',
        usuario
    });
};

const usuariosDelete = async( req, res = response ) => {
    const { id } = req.params;
// Borrado fisico de la bd
    // const usuario = await Usuario.findByIdAndDelete( id);
//Borrado logico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

//cuerpo del objeto
    res.json({
        msg: 'Usuario eliminado',
        usuario
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}