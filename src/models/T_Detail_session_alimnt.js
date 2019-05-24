/* jshint indent: 2 */

const connexion = require('../../config/dbConnection');
const DataTypes = require('sequelize');
const Periode_ration = require('./T_Periode_Ration');

const Detail_session_alimnt = connexion.define('T_Detail_session_alimnt', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nbrVache: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    commentaire: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paddock_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Paddock',
            key: 'id'
        }
    },
    session_alimentation_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'T_Session_alimentation',
            key: 'id'
        }
    }
}, {
    tableName: 'T_Detail_session_alimnt'
})


Detail_session_alimnt.hasMany(Periode_ration, {
    as: 'T_Periode_Ration',
    foreignKey: 'detailAlimentation_ID',
    sourceKey: 'id'
});
Periode_ration.belongsTo(Detail_session_alimnt, {
    as: 'T_Detail_session_alimnt',
    foreignKey: 'detailAlimentation_ID',
    targetKey: 'id'
});


module.exports = Detail_session_alimnt;
