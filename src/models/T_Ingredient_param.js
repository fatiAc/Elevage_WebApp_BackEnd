/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Ingredient = require('./T_Ingredient');

const Ingredient_param = connexion.define('T_Ingredient_param', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    qte_theorique: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    qte_reel: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    difference: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ingredient_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Ingredient',
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
    tableName: 'T_Ingredient_param'
})

// Ingredient_param.hasOne(Ingredient, {as: 'ingredient_ID', foreignKey: 'ingredient_ID'});

module.exports = Ingredient_param;
