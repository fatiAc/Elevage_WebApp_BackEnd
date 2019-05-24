/* jshint indent: 2 */
const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Ingredient = require('./T_Ingredient');

const Formule = connexion.define('T_Formule', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pourcentage: {
        type: DataTypes.FLOAT,
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
    ingredient_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Ingredient',
            key: 'id'
        }
    }
}, {
    tableName: 'T_Formule'
})

Formule.hasOne(Ingredient, {as: 'T_Ingredient', foreignKey: 'ingredient_ID'});

module.exports = Formule;
