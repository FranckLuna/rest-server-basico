const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    correo:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true,
    },
    password:{
        type: String,
        required: [true, 'El contraseña es requerido'],
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required:  true,
        //  ['ADMIN_ROLE','USER_ROLE', 'VENTAS_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

//me permite quitar __V y el password de la impresion
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model( 'Usuario', UsuarioSchema );