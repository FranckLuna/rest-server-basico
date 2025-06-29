const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');

const { esRolValido, emailExiste, existeUsuarioPorId  } = require('../helpers/db-validators');

const { 
        validarCampos, 
        validarJWT, 
        tieneRole, 
        esAdminRole
 } = require('../middleweres');


const router = Router();

router.get('/', usuariosGet );

router.put('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ), //validacion personalizada
        validarCampos
]
, usuariosPut );

router.post('/',[
        check('correo', 'El correo no es valido').isEmail(), //validacion de express-validator
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y debe tener mas de 6 letras').isLength({ min: 6 }),
        //check('rol', 'El rol no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRolValido ), //validacion personalizada
        check('correo').custom( emailExiste ), //validacion personalizada
        validarCampos
] 
,usuariosPost );

router.delete('/:id', [
        validarJWT,
        // esAdminRole, valida que sea ADMIN_ROLE
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'), // valida que tenga un rol del arreglo
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], usuariosDelete );

module.exports = router;