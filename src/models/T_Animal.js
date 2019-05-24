/* jshint indent: 2 */
const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Mesure = require('./T_Mesure');

const Animal = connexion.define('T_Animal', {
    snit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    paddock_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'T_Paddock',
        key: 'id'
      }
    }
  }, {
    tableName: 'T_Animal'
  })


Animal.hasMany(Mesure , {as : 'T_Mesure', foreignKey: 'animal_ID', sourceKey: 'snit'});
Mesure.belongsTo(Animal, {as : 'T_Animal', foreignKey: 'animal_ID', targetKey: 'snit'});

module.exports = Animal;

