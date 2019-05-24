let sequelize = require('sequelize');
let config = require('./config');

const connexion = new sequelize(
    config.database, config.username, config.password, {
        host : config.server,
        dialect : config.dialect,
        dialectOptions : {
            encrypt : true
        },
        pool : {
            max : 5,
            min : 0,
            acquire : 30000,
            idle : 10000
        },
        define : {
            timestamps : false
        },
        logging : console.log
    }
);

connexion.authenticate()
    .then( ( )=> console.log('Connexion is OK'))
    .catch((err) => console.log(err));

module.exports = connexion;
