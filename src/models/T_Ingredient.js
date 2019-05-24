/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Ingredient_param = require('./T_Ingredient_param');

const Ingredient = connexion.define('T_Ingredient', {
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
    tableName: 'T_Ingredient'
})


module.exports = Ingredient;
