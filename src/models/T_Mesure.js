/* jshint indent: 2 */
const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');

const Mesure = connexion.define('T_Mesure', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    poids: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dateMesure: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    user_login: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'T_User',
            key: 'login'
        }
    },
    animal_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Animal',
            key: 'snit'
        }
    }
}, {
    tableName: 'T_Mesure'
})

module.exports = Mesure;
