const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) =>{
    return new Promise((resolve, reject) =>{ //las promess regresan un reject y resolve
        const payload = { uid }; //el payload es un argumento de JWT
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { //
            expiresIn: '4h'
        }, ( err, token ) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token'); // todo mal
            } else {
                resolve( token ); //todo bien
            }
        } );
    });
};

module.exports = {
    generarJWT
}