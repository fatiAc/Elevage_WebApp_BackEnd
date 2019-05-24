/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Animal = require('./T_Animal');
const Detail_alimentation = require('./T_Detail_session_alimnt');
const Type_paddock = require('./T_TypePaddock');

const Paddock = connexion.define('T_Paddock', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    typePaddock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_TypePaddock',
            key: 'id'
        }
    }
}, {
    tableName: 'T_Paddock'
});

Paddock.hasMany(Animal, {as: 'T_Animal', foreignKey: 'paddock_ID', sourceKey: 'id'});
Animal.belongsTo(Paddock, {as: 'T_Paddock', foreignKey: 'paddock_ID', targetKey: 'id'});

Paddock.hasMany(Detail_alimentation, {as: 'T_Detail_session_alimnt', foreignKey: 'id'})
Detail_alimentation.belongsTo(Paddock, {as: 'T_Paddock', foreignKey: 'paddock_ID', targetKey: 'id'});

Paddock.hasOne(Type_paddock, {as: 'T_TypePaddock', foreignKey: 'typePaddock'});


module.exports = Paddock;
