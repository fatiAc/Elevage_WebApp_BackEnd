/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Machine = require('./T_Machine');
const Nourriture = require('./T_Nourriture');
const Periode_aliment = require('./T_Periode_alimentation');
const Livraison = require('./T_Livraison');

const Recup_sessionAlimnt = connexion.define('T_Recup_sessionAlimnt', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nbrPreparation: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    qteTotal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nourriture_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Nourriture',
            key: 'id'
        }
    },
    sessionAlimnt_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Session_alimentation',
            key: 'id'
        }
    },
    machine_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Machine',
            key: 'id'
        }
    },
    periode_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Periode_alimentation',
            key: 'id'
        }
    }
}, {
    tableName: 'T_Recup_sessionAlimnt'
})


Recup_sessionAlimnt.hasMany(Livraison, {as: 'T_Livraison', foreignKey: 'recup_sessionAlimnt_ID', sourceKey: 'id'});
Livraison.belongsTo(Recup_sessionAlimnt, {
    as: 'T_Recup_sessionAlimnt',
    foreignKey: 'recup_sessionAlimnt_ID',
    targetKey: 'id'
});


Recup_sessionAlimnt.hasOne(Machine, {as: 'T_Machine', foreignKey: 'machine_ID'});
Recup_sessionAlimnt.hasOne(Nourriture, {as: 'T_Nourriture', foreignKey: 'nourriture_ID'});
Recup_sessionAlimnt.hasOne(Periode_aliment, {as: 'T_Periode_alimentation', foreignKey: 'periode_ID'});

module.exports = Recup_sessionAlimnt;
