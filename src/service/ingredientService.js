let ingredient = require('../models/T_Ingredient.js');
let dbConnection = require('../../config/dbConnection');
let sequelize = require('sequelize');


class ingredientService {

    static findByName(name) {
        return ingredient.findOne({
            where: {nom: name},
            attributes: ['nom']
        })
    }

    static create(nom) {
        return ingredient.create({
            nom: nom
        })
    }

    static deleteByName(name) {
        let query = `DELETE FROM T_Ingredient WHERE nom = '${name}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.DELETE});
    }

    static editIngredName(name, newName) {
        let query = `UPDATE T_Ingredient SET nom = '${newName}' WHERE nom = '${name}'`;
        return dbConnection.query(query, {type: sequelize.QueryTypes.UPDATE});
    }

    static allIngrednt() {
        return ingredient.findAll({
            attributes: ['id', 'nom']
        })
    }

}

module.exports = ingredientService;
