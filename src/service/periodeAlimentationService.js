let periodeAliment = require('../models/T_Periode_alimentation');
let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');


class periodeAlimentationService {

    static allPeriodeAliment() {
        return periodeAliment.findAll({
                attributes: ['id', 'periode'],
                order: [
                    ['periode', 'ASC'],
                ],
            }
        )
    }

    static findByPeriode(periode) {
        return periodeAliment.findOne({
            where: {periode: periode},
            attributes: ['periode']
        })
    }

    static create(periode) {
        return periodeAliment.create({
            periode: periode
        })
    }

    static deleteByPeriode(periode) {
        let query = `DELETE FROM T_Periode_alimentation WHERE periode = '${periode}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }

    static editPeriod(periode, newPeriod) {
        let query = `UPDATE T_Periode_alimentation SET periode = '${newPeriod}' WHERE periode = '${periode}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.UPDATE});
    }
}

module.exports = periodeAlimentationService;
