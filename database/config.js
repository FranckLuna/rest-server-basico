const mongoose = require('mongoose');

const dbConection = async() =>{
    try {
        
        await mongoose.connect('mongodb://localhost:27017/cafeDb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado a MongoDb');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la DB');
    }
};

module.exports = {
    dbConection
}
