/* jshint indent: 2 */
const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Paddock = require('./T_Paddock');

const Paddock_param = connexion.define('T_Paddock_param', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nbrElement: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    moyOfElement: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paddock_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Paddock',
            key: 'id'
        }
    },
    livraison_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Livraison',
            key: 'id'
        }
    }

}, {
    tableName: 'T_Paddock_param'
})

Paddock_param.hasOne(Paddock, {as: 'T_Paddock', foreignKey: 'paddock_ID'});


module.exports = Paddock_param;
