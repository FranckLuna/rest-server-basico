const { response } = require("express")


const esAdminRole = (req, res = response, next ) =>{
    if( !req.usuario ){
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token"
        });
    };

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `el ${nombre} no es administrador`
        });
    };

    next();
};

const tieneRole = ( ...roles ) =>{
    return ( req, res = response, next)=> {
        if( !req.usuario ){
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token"
            });
        };

        if( !roles.includes( req.usuario.rol) ){
            return res.status(401).json({
                msg: `El sevicio requiere uno de estos roles: ${roles}`
            });
        };

        next();
    }
};

module.exports ={
    esAdminRole,
    tieneRole
};