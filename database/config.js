const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cafeDB');
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error(error);
        throw new Error('Error al iniciar la DB');
    }
};

module.exports = {
    dbConnection
};
