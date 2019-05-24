/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Mesure = require('./T_Mesure');
const Animal = require('./T_Animal');
const Paddock = require('./T_Paddock');

const Mouvement = connexion.define('T_Mouvement', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    dateMvnt: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    paddock_src: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Paddock',
            key: 'id'
        }
    },
    paddock_dest: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Paddock',
            key: 'id'
        }
    },
    animal_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Animal',
            key: 'snit'
        }
    },
    user_login: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'T_User',
            key: 'login'
        }
    },
    mesure_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Mesure',
            key: 'id'
        }
    }
}, {
    tableName: 'T_Mouvement'
})

Mouvement.hasOne(Mesure, {as: 'T_Mesure', foreignKey: 'mesure_ID'});
Mouvement.hasOne(Animal, {as: 'T_Animal', foreignKey: 'animal_ID'});

Mouvement.hasOne(Paddock, {as: 'T_Paddock', foreignKey: 'paddock_src'});
// Mouvement.hasOne(Paddock, {as: 'T_Paddock', foreignKey: 'paddock_dest'});


module.exports = Mouvement;
