let animal = require('../models/T_Animal');
let dbConnection = require('../../config/dbConnection');
let sequelize = require('sequelize');


class animalSerice {

    static allAnimals() {
        return animal.findAll({
            attributes: ['snit']
        })
    }

    static findBySnit(snit) {
        return animal.findOne({
            where: {snit: snit},
            attributes: ['snit']
        })
    }

    static create(snit, paddockID) {
        return animal.create({
            snit: snit,
            paddock_ID: paddockID
        })
    }

    static editPaddockOfAnimal(snit, paddock_ID) {
        return this.findBySnit(snit)
            .then(animal => {
                animal.update({
                    paddock_ID: paddock_ID
                })
            })
    }

    static deleteAnimal(snit) {
        let query = `DELETE FROM T_Animal WHERE snit = ${snit}`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }
}

module.exports = animalSerice;
