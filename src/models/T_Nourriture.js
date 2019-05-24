/* jshint indent: 2 */
const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Formule = require('./T_Formule');

const Nourriture = connexion.define('T_Nourriture', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'T_Nourriture'
})

Nourriture.hasMany(Formule, {as: 'T_Formule', foreignKey: 'nourriture_ID', sourceKey: 'id'});
Formule.belongsTo(Nourriture, {as: 'T_Nourriture', foreignKey: 'nourriture_ID', targetKey: 'id'});

module.exports = Nourriture;
