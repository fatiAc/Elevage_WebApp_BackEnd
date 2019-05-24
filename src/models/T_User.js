/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Mesure = require('./T_Mesure');

const User = connexion.define('T_User', {
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'T_User'
  });

User.hasMany(Mesure, {as : 'T_Mesure', foreignKey: 'user_login', sourceKey: 'login'});
Mesure.belongsTo(User, {as : 'T_User', foreignKey: 'user_login', targetKey: 'login'});

module.exports = User;
