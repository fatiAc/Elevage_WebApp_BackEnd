let typePaddock = require('../models/T_TypePaddock');
let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');


class typePaddockService {

    static allTypesPaddocks() {
        return typePaddock.findAll({
            attributes: ['id', 'type'],
            order: ['type']
        })
    }

    static findByName(type) {
        return typePaddock.findOne({
            where: {type: type},
            attributes: ['type']
        })
    }

    static create(type) {
        return typePaddock.create({
            type: type
        })
    }

    static editType(type, newType) {
        let query = `UPDATE T_TypePaddock SET type = '${newType}' WHERE type = '${type}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.UPDATE});
    }

    static deleteByType(type) {
        let query = `DELETE FROM T_TypePaddock WHERE type = '${type}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }
}

module.exports = typePaddockService;
