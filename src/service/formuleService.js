let formule = require('../models/T_Formule');


class formuleService {

    static create(ingredient_ID, nourriture_ID, pourcentage) {
        return formule.create({
            ingredient_ID: ingredient_ID,
            nourriture_ID: nourriture_ID,
            pourcentage: pourcentage
        })
    }
}

module.exports = formuleService
