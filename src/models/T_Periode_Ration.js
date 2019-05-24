/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Nourriture = require('./T_Nourriture');
const Period_alimentation = require('./T_Periode_alimentation');

const Periode_ration = connexion.define('T_Periode_Ration', {
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
    moy_qte_vache: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    detailAlimentation_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Detail_session_alimnt',
            key: 'id'
        }
    },
    nourriture_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Nourriture',
            key: 'id'
        }
    },
    periodeAlimentation_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Periode_alimentation',
            key: 'id'
        }
    },
}, {
    tableName: 'T_Periode_Ration'
})

Periode_ration.hasOne(Nourriture, {as: 'T_Nourriture', foreignKey: 'nourriture_ID'});
Periode_ration.hasOne(Period_alimentation, {as: 'T_Periode_alimentation', foreignKey: 'periodeAlimentation_ID'});

module.exports = Periode_ration;
