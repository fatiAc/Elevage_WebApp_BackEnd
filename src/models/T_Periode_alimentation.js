/* jshint indent: 2 */
const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');

const Periode_alimentation = connexion.define('T_Periode_alimentation', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    periode: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'T_Periode_alimentation'
})

module.exports = Periode_alimentation;
