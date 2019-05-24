let paddock = require('../models/T_Paddock');
let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');


class paddockService {

    static allPaddocks() {
        let query = `SELECT nom, T_Paddock.id, TTP.type FROM T_Paddock
                        INNER JOIN T_TypePaddock TTP on T_Paddock.typePaddock = TTP.id
                            ORDER BY TTP.type, nom`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.SELECT});
    }

    static findByName(nom) {
        return paddock.findOne({
            where: {nom: nom},
            attributes: ['nom']
        })
    }

    static create(nom, typePaddock) {
        return paddock.create({
            nom: nom,
            typePaddock: typePaddock
        })
    }

    static updatePaddock(name, newName, newTypPaddock) {
        let query = `UPDATE T_Paddock SET nom = '${newName}', typePaddock = ${newTypPaddock} WHERE nom = '${name}' ;`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.UPDATE});
    }

    static deleteByName(name) {
        let query = `DELETE FROM T_Paddock WHERE nom = '${name}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }
}

module.exports = paddockService;
