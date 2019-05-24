/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const User = require('./T_User');
const Detail_alimentation = require('./T_Detail_session_alimnt');
const Recup_session_alimentation = require('./T_Recup_sessionAlimnt');

const Session_alimentation = connexion.define('T_Session_alimentation', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
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
    }
}, {
    tableName: 'T_Session_alimentation'
})

Session_alimentation.hasOne(User, {as: 'T_User', foreignKey: 'user_login'});

Session_alimentation.hasMany(Detail_alimentation, {
    as: 'T_Detail_session_alimnt',
    foreignKey: 'session_alimentation_ID',
    sourceKey: 'id'
});
Detail_alimentation.belongsTo(Session_alimentation, {
    as: 'T_Session_alimentation',
    foreignKey: 'session_alimentation_ID',
    targetKey: 'id'
});


Session_alimentation.hasMany(Recup_session_alimentation, {
    as: 'T_Recup_sessionAlimnt',
    foreignKey: 'sessionAlimnt_ID',
    sourceKey: 'id'
});
Recup_session_alimentation.belongsTo(Session_alimentation, {
    as: 'T_Session_alimentation',
    foreignKey: 'session_alimentation_ID',
    targetKey: 'id'
});

module.exports = Session_alimentation;
