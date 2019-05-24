/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');

const Type_paddock = connexion.define('T_TypePaddock', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'T_TypePaddock'
})

module.exports = Type_paddock;
