const validaCampos = require('../middleweres/validar-campos');
const validaJWT = require('../middleweres/validar-jwt');
const validaRoles = require('../middleweres/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
};
