/* jshint indent: 2 */
const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Ingredient_param = require('./T_Ingredient_param');
const Paddock_param = require('./T_Paddock_param');

const Livraison = connexion.define('T_Livraison', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    recup_sessionAlimnt_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Recup_sessionAlimnt',
            key: 'id'
        }
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    tableName: 'T_Livraison'
})

Livraison.hasMany(Paddock_param, {as: 'T_Paddock_param', foreignKey: 'livraison_ID', sourceKey: 'id'});
Paddock_param.belongsTo(Livraison, {as: 'T_Livraison', foreignKey: 'livraison_ID', targetKey: 'id'});

Livraison.hasMany(Ingredient_param, {as: 'T_Ingredient_param', foreignKey: 'livraison_ID', sourceKey: 'id'});
Ingredient_param.belongsTo(Livraison, {as: 'T_Livraison', foreignKey: 'livraison_ID', targetKey: 'id'});



module.exports = Livraison;
