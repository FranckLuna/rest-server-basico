const Role = require('../models/role');
const Usuario = require('../models/usuario') //importamos el Usuario


const esRolValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol: ${rol} no es un rol valido `);
    }
};
//validacion personalizada
const emailExiste = async( correo = '') =>{
     const existeEmail = await Usuario.findOne({correo}); //busca en la bd
        if( existeEmail ){
            throw new Error( `El mail ${ correo } ya se encuentra registrado` );
        }
};
// validacion personalizada 
const existeUsuarioPorId = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error('EL usuario con el id no existe en la base de datos')
    };
};

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
};