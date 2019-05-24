let machineSpecielite = require('../models/T_Machine_specialite');
let sequelize = require('sequelize');
let dbConnection = require('../../config/dbConnection');


class machienSpecialiteService {

    static create(nourriture_ID, machine_ID) {
        return machineSpecielite.create({
            nourriture_ID: nourriture_ID,
            machine_ID: machine_ID
        })
    }

    static deleteByMachine(name) {
        let query = `DELETE FROM T_Machine_specialite WHERE machine_ID IN (SELECT id FROM T_Machine WHERE name = '${name}')`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }
}

module.exports = machienSpecialiteService;
