let machine = require('../models/T_Machine');
let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');


class machineService {

    static findByName(name) {
        return machine.findOne({
            where: {name: name},
            attributes: ['name']
        })
    }

    static create(name, capacite) {
        return machine.create({
            name: name,
            capacite: capacite
        })
    }

    static deleteByName(name) {
        let query = `DELETE FROM T_Machine WHERE name = '${name}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }
}

module.exports = machineService;
