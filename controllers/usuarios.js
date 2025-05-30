const { response } = require('express');


const usuariosGet =  (req, res = response) => {
    // const params = req.query;
    const { q, nombre = 'sin nombre', apikey } = req.query;
    //cuerpo del objeto
    res.json({
        msg: 'Get API controlador',
        q,
        nombre,
        apikey
    })
};

const usuariosPost = ( req, res = response ) => {
    //const body = req.body;
    //destructurar lo que se necesita
    const { nombre, edad }= req.body;

    //cuerpo del objeto
    res.json({
        msg: 'Post API desde el controlador',
        nombre,
        edad
    });
};

const usuariosPut = ( req, res = response ) => {
    const id = req.params.id;
    //cuerpo del objeto
    res.json({
        msg: 'Put API desde el controlador',
        id
    });
};

const usuariosDelete = ( req, res = response ) => {
    //cuerpo del objeto
    res.json({
        msg: 'Delete API desde el controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}